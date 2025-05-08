import express from 'express';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';

const app = express();
const PORT = process.env.PORT || 3000;
const users={};
const rooms={};

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['https://wpm-multiplayer-game.vercel.app'],
        methods: ['GET', 'POST'],
    },
});

app.use(cors({
    origin: ['https://wpm-multiplayer-game.vercel.app']
}));
app.use(express.json());

export async function Quote() {
    try {
        const response = await fetch('http://api.quotable.io/quotes/random?minLength=1', {
           
        });
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.log(error);
        return { error: "Failed to fetch quote" };
    }
}

app.get('/quote', async (req, res) => {
    const quote = await Quote();
    
    res.json(quote);
});


function getPlayersListByRoom(roomName) {
    return Object.values(users)
        .filter(user => user.name && user.room === roomName)
        .map(user => ({
            id: user.id,
            name: user.name,
            room: user.room,
            wpm: user.wpm || 0
        }));
}

io.on('connection',(socket)=>{
    console.log(`User Connected: ${socket.id}`)

    users[socket.id]={
        id:socket.id,
        name:null,
        room:null,
        wpm: null
    }
    
    socket.on('newPlayer', async (player)=>{
        users[socket.id].name=player.name
        users[socket.id].room=player.room

        if(!rooms[player.room]){
            const quoteData= await Quote();
            rooms[player.room]= {
                quote: quoteData[0] || { content: "Default quote", author: "Unknown" },
                players: []
            }
        }

        rooms[player.room].players.push({
            id: socket.id,
            name: player.name
        })

        socket.join(player.room)

       
        const roomPlayers = getPlayersListByRoom(player.room);
        io.to(player.room).emit('players', roomPlayers);

        socket.emit('currentQuote', rooms[player.room].quote);
    })
    
    socket.on('disconnect', ()=>{
        console.log(`User Disconnected: ${socket.id}`)
        const userRoom = users[socket.id]?.room;
        
        
        if (userRoom && rooms[userRoom]) {
            rooms[userRoom].players = rooms[userRoom].players.filter(
                player => player.id !== socket.id
            );
            
            
            if (rooms[userRoom].players.length === 0) {
                delete rooms[userRoom];
            } else {
               
                io.to(userRoom).emit('players', getPlayersListByRoom(userRoom));
            }
        }
        
        delete users[socket.id];
    })
    
    socket.on('getPlayers', (roomName) => {
        if (roomName) {
            const roomPlayers = getPlayersListByRoom(roomName);
            socket.emit('players', roomPlayers);
        }
    });

    socket.on('changeQuote', async(roomName)=>{
        if (!roomName || !rooms[roomName]) return;
        
        const quote = await Quote();
        rooms[roomName].quote = quote[0];
        io.to(roomName).emit('statsReset');
        io.to(roomName).emit('currentQuote', rooms[roomName].quote);
    })

    socket.on('getQuote', (roomName)=>{
        if (roomName && rooms[roomName]) {
            socket.emit('currentQuote', rooms[roomName].quote);
        }
    })
    
    socket.on('wpm', (wpm)=>{
        const userRoom = users[socket.id]?.room;
        if (!userRoom) return;
        
        users[socket.id].wpm = wpm;
        
  
        io.to(userRoom).emit('players', getPlayersListByRoom(userRoom));
    })
})

httpServer.listen(PORT, () => {
    console.log(`Server is running on Port:${PORT}`);
});