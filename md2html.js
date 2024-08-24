import { marked } from 'marked'

import * as fs from 'fs'
import * as path from 'path'


const year= process.env.npm_package_config_year
const key_color = process.env.npm_package_config_color

const inFile = process.argv[2]
const outFile = process.argv[3]

const inputContent = fs.readFileSync(inFile, 'utf8')

const renderer = new marked.Renderer();
const heading = renderer.heading.bind(renderer)
renderer.heading = (text, level, raw, slugger) => {
    let cls = ` class="center">`
    let closer = `</`
    if (level == 1) {
        cls = ` class="header center ${key_color}-text darken-4">`
    }
    if (level == 2) {
        cls = ` class="center ${key_color}-text darken-1"><i class="material-icons">`
        closer = `</i></`
    }
    return heading(text, level, raw, slugger).replace(/>/i, cls).replace(/<\//i, closer)
}

marked.use({ renderer })
marked.use({
    mangle: false,
    headerIds: false
});

const content = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <title>Learn Languages ${year}</title>

  <!-- CSS  -->
  <link rel ="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="./css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="./css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>
</head>
<body>
  <nav class="${key_color} darken-1" role="navigation">
    <div class="nav-wrapper container"><a id="logo-container" href="#" class="brand-logo">Learn&nbsp;Languages</a>
      <ul class="right hide-on-med-and-down">
        <li><a href="https://twitter.com/lljapan/" target="_blank"><i class="fab fa-twitter"></i></a></li>
        <li><a href="https://facebook.com/lljapan/" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
      </ul>
      <ul id="nav-mobile" class="sidenav">
        <li><a href="#about">About</a></li>
        <li><a href="#session">Session</a></li>
        <li><a href="#history">History</a></li>
      </ul>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>

  ${marked(inputContent)}

  <footer class="page-footer white">
    <div class="footer-copyright black lighten-1">
      <div class="container">
        Copyright © 2022 LLイベント実行委員会
      </div>
    </div>
  </footer>


  <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/init.js"></script>

  </body>
</html>`

const parent = path.dirname(outFile)
fs.mkdir(parent, (err) => {
    //console.log(err)
})
const css_path = parent+'/css'
fs.mkdir(css_path, (err) => {
    //console.log(err)
})
fs.copyFile('./css/materialize.css', css_path+'/materialize.css', (err) => {
    //console.log(err)
})
fs.copyFile('./css/style.css', css_path+'/style.css', (err) => {
    //console.log(err)
})
fs.writeFileSync(outFile, content)
