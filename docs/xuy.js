 const firebaseConfig = {
      databaseURL: "https://xushi-8a5ea-default-rtdb.firebaseio.com/"
    };

    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    const chatDiv = document.getElementById("chat");

    // 实时监听新消息
    db.ref("messages").on("child_added", function(snapshot) {
      const data = snapshot.val();
      const div = document.createElement("div");
      div.className = "msg " + (data.name === document.getElementById("name").value ? "you" : "other");
      div.textContent = data.name + ": " + data.message;
      chatDiv.appendChild(div);
      chatDiv.scrollTop = chatDiv.scrollHeight;
    });

    // 发送消息
    function sendMessage() {
      const name = document.getElementById("name").value.trim();
      const message = document.getElementById("message").value.trim();
      if (name && message) {
        db.ref("messages").push({ name, message });
        document.getElementById("message").value = "";
      }
    }
