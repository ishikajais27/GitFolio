![Masterhead](https://github.com/user-attachments/assets/811cde9b-6a9f-4ed9-8edf-10c5d3fb03e8)

<h3 align="center"><strong>Hello, World! 👋 I'm {{name}}</strong></h3>
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif">

### Intro:

<p align="center">{{bio}}</p>
<img align="right" alt="coding" width="400" src="https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif">
<p align="left"> <img src="https://komarev.com/ghpvc/?username={{username}}&label=Profile%20views&color=0e75b6&style=flat" alt="{{username}}" /> </p>

### About Me:

{{#if aboutMe}}
{{#each aboutMe}}

- {{this}}
  {{/each}}
  {{else}}
- Passionate about coding and open source
- Always learning new technologies
  {{/if}}

<h3 align="left">Connect with me:</h3>
<p align="left">
{{#if socialLinks}}
{{#each socialLinks}}
<a href="{{this.url}}" target="blank"><img align="center" src="{{this.icon}}" alt="{{this.platform}}" height="30" width="40" /></a>
{{/each}}
{{/if}}
<a href="https://github.com/{{username}}" target="blank"><img align="center" src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="github logo" height="30" width="40" /></a>
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left">
{{#if skills}}
{{#each skills}}
<a href="https://www.google.com/search?q={{@key}}+programming" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{{@key}}/{{@key}}-original.svg" alt="{{@key}}" width="40" height="40"/> </a>
{{/each}}
{{else}}
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
{{/if}}
</p>

### GitHub Stats:

![](https://github-readme-stats.vercel.app/api?username={{username}}&theme=monokai&hide_border=false&include_all_commits=true&count_private=true)
![](https://github-readme-streak-stats.herokuapp.com/?user={{username}}&theme=monokai&hide_border=false)
![](https://github-readme-stats.vercel.app/api/top-langs/?username={{username}}&theme=monokai&hide_border=false&include_all_commits=true&count_private=true&layout=compact)

### Github Trophies:

![](https://github-profile-trophy.vercel.app/?username={{username}}&theme=darkhub&no-frame=false&no-bg=false&margin-w=4)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif">
