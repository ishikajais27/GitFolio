![logo](https://img.freepik.com/premium-photo/anime-girl-using-laptop-city-night_1282444-139680.jpg)

<h1 align="center">Hi 👋, I'm {{name}}</h1>

<h3 align="center">{{headline}}</h3>

<p align="left">
{{bio}}
</p>

<img align="right" alt="Coding" width="400" src="https://static1.squarespace.com/static/5fe4caeadae61a2f19719512/t/6696219ad6dcda40f9fa8ab6/1721115042117/16.gif?format=1500w">

---

### 📚 Education

🎓 **{{education}}**  
📍 _{{education_location}}_

---

### 🛠️ Skills

{{#if skills}}
{{#each skills}}

- **{{@key}}**: {{this}}
  {{/each}}
  {{else}}
- No skills specified
  {{/if}}

---

### 📊 GitHub Stats

<p align="left">
  <img src="https://github-readme-stats.vercel.app/api/top-langs?username={{username}}&show_icons=true&locale=en&layout=compact" alt="Top Languages" />
</p>

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username={{username}}&show_icons=true&locale=en" alt="GitHub Stats" />
</p>

---

### 📫 Connect with Me

<p align="left">
{{#if socialLinks}}
{{#each socialLinks}}
<a href="{{this.url}}" target="blank"><img align="center" src="{{this.icon}}" alt="{{this.platform}}" height="30" width="40" /></a>
{{/each}}
{{/if}}
<a href="https://github.com/{{username}}" target="blank"><img align="center" src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="github logo" height="30" width="40" /></a>
</p>

---

### ⚡ Fun Fact

💡 {{funFact}}
