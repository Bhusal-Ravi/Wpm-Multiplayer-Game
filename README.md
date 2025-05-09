# Typing Speed Race - A Multiplayer Challenge
![image](https://github.com/user-attachments/assets/818c4b15-fb3e-4ca6-abca-c635c9e84eb2)


Typing Speed Race is a real-time multiplayer typing game where players compete in custom rooms by typing the same quote. The game tracks each player’s speed (WPM) and shows live rankings. Features include synchronized quotes, a countdown timer, and a clean UI for focused typing. Future updates will add leaderboards, new game modes, and performance analytics.


🔧 How It Works
Join or Create a Room

Players enter their name and a room ID on the landing screen.

If the entered room ID exists, the player joins the existing room.

If the room ID doesn't exist, a new room is automatically created.

Lobby System

Once in the room, players wait in the lobby until at least two participants have joined.

When the game starts, all players receive the same typing prompt.

Typing Race

Players race to type the given passage as fast and accurately as they can.

Input is monitored in real time, showing progress and accuracy.

Mistyped words or characters may be highlighted to encourage correction before progressing.

Real-time Multiplayer via WebSockets

The game leverages Socket.IO to maintain low-latency communication between the server and connected clients.

Player progress, room status, and results are synced in real time.

Game End and Results

The game ends when the first player finishes the passage.

Final results, including typing speed (WPM) and accuracy, are displayed to all participants.

Players can choose to restart or join a different room.

✨ Features
Real-time multiplayer experience

Auto room creation and validation

Real-time input tracking and word highlighting

Leaderboard display after race completion

Responsive and intuitive UI built with Tailwind CSS
