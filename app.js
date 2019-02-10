const fs = require('fs')
const { searchImages } = require('pixabay-api')
const {createCanvas, loadImage } = require('canvas')
const Canvas = require('canvas')
 
const AUTH_KEY = '11551932-0ed9987491d8c08221c3cb5bf'
const config = { lang: 'fr', image_type: 'photo', safesearch: true, min_height: 1080, min_width: 1080 }

let src = ''
let img = new Canvas.Image
const out = fs.createWriteStream(__dirname + '/verbes.png')

const verbes = [["respecter / se conformer à","abide","abode","abode"],["survenir","arise","arose","arisen"],["se réveiller","awake","awoke","awoken"],["être","be","was were","been"],["porter / supporter / naître","bear","bore","borne / born"],["battre","beat","beat","beaten"],["devenir","become","became","become"],["engendrer","beget","begat / begot","begotten"],["commencer","begin","began","begun"],["plier / se courber","bend","bent","bent"],["parier","bet","bet","bet"],["offrir","bid","bid / bade","bid / bidden"],["mordre","bite","bit","bitten"],["saigner","bleed","bled","bled"],["souffler / gonfler","blow","blew","blown"],["casser","break","broke","broken"],["élever (des animaux)","breed","bred","bred"],["apporter","bring","brought","brought"],["diffuser / émettre","broadcast","broadcast","broadcast"],["construire","build","built","built"],["brûler","burn","burnt / burned","burnt / burned"],["éclater","burst","burst","burst"],["acheter","buy","bought","bought"],["pouvoir","can","could","could"],["jeter / distribuer (rôles)","cast","cast","cast"],["attraper","catch","caught","caught"],["gronder","chide","chid / chode","chid / chidden"],["choisir","choose","chose","chosen"],["s'accrocher","cling","clung","clung"],["habiller / recouvrir","clothe","clad / clothed","clad / clothed"],["venir","come","came","come"],["coûter","cost","cost","cost"],["ramper","creep","crept","crept"],["couper","cut","cut","cut"],["distribuer","deal","dealt","dealt"],["creuser","dig","dug","dug"],["plonger","dive","dived","dived / dove"],["faire","do","did","done"],["dessiner / tirer","draw","drew","drawn"],["rêver","dream","dreamt / dreamed","dreamt / dreamed"],["boire","drink","drank","drunk"],["conduire","drive","drove","driven"],["habiter","dwell","dwelt","dwelt / dwelled"],["manger","eat","ate","eaten"],["tomber","fall","fell","fallen"],["nourrir","feed","fed","fed"],["se sentir / ressentir","feel","felt","felt"],["se battre","fight","fought","fought"],["trouver","find","found","found"],["s'enfuir","flee","fled","fled"],["lancer","fling","flung","flung"],["voler","fly","flew","flown"],["interdire","forbid","forbade","forbidden"],["prévoir","forecast","forecast","forecast"],["prévoir / presentir","foresee","foresaw","foreseen"],["oublier","forget","forgot","forgotten / forgot"],["pardonner","forgive","forgave","forgiven"],["abandonner","forsake","forsook","forsaken"],["geler","freeze","froze","frozen"],["obtenir","get","got","gotten / got"],["donner","give","gave","given"],["aller","go","went","gone"],["moudre / opprimer","grind","ground","ground"],["grandir / pousser","grow","grew","grown"],["tenir / pendre","hang","hung","hung"],["avoir","have","had","had"],["entendre","hear","heard","heard"],["cacher","hide","hid","hidden"],["taper / appuyer","hit","hit","hit"],["tenir","hold","held","held"],["blesser","hurt","hurt","hurt"],["garder","keep","kept","kept"],["s'agenouiller","kneel","knelt / knelled","knelt / kneeled"],["connaître / savoir","know","knew","known"],["poser","lay","laid","laid"],["mener / guider","lead","led","led"],["s'incliner / se pencher","lean","leant / leaned","leant / leaned"],["sauter / bondir","leap","leapt / leaped","leapt / leaped"],["apprendre","learn","learnt","learnt"],["laisser / quitter / partir","leave","left","left"],["prêter","lend","lent","lent"],["permettre / louer","let","let","let"],["s'allonger","lie","lay","lain"],["allumer","light","lit / lighted","lit / lighted"],["perdre","lose","lost","lost"],["fabriquer","make","made","made"],["signifier","mean","meant","meant"],["rencontrer","meet","met","met"],["tondre","mow","mowed","mowed / mown"],["compenser","offset","offset","offset"],["surmonter","overcome","overcame","overcome"],["prendre part à","partake","partook","partaken"],["payer","pay","paid","paid"],["supplier / plaider","plead","pled / pleaded","pled / pleaded"],["programmer","preset","preset","preset"],["prouver","prove","proved","proven / proved"],["mettre","put","put","put"],["quitter","quit","quit","quit"],["lire","read","read","read"],["relayer","relay","relaid","relaid"],["déchirer","rend","rent","rent"],["débarrasser","rid","rid","rid"],["monter (vélo"," cheval)","ride","rode","ridden"],["sonner / téléphoner","ring","rang","rung"],["lever","rise","rose","risen"],["courir","run","ran","run"],["scier","saw","saw / sawed","sawn / sawed"],["dire","say","said","said"],["voir","see","saw","seen"],["chercher","seek","sought","sought"],["vendre","sell","sold","sold"],["envoyer","send","sent","sent"],["fixer","set","set","set"],["secouer","shake","shook","shaken"],["répandre / laisser tomber","shed","shed","shed"],["briller","shine","shone","shone"],["chausser","shoe","shod","shod"],["tirer / fusiller","shoot","shot","shot"],["montrer","show","showed","shown"],["fermer","shut","shut","shut"],["chanter","sing","sang","sung"],["couler","sink","sank / sunk","sunk / sunken"],["s'asseoir","sit","sat","sat"],["tuer","slay","slew","slain"],["dormir","sleep","slept","slept"],["glisser","slide","slid","slid"],["s'en aller furtivement","slink","slunk / slinked","slunk / slinked"],["fendre","slit","slit","slit"],["sentir","smell","smelt","smelt"],["semer","sow","sowed","sown / sowed"],["parler","speak","spoke","spoken"],["aller vite","speed","sped","sped"],["épeler / orthographier","spell","spelt","spelt"],["dépenser / passer du temps","spend","spent","spent"],["renverser","spill","spilt / spilled","spilt / spilled"],["tourner / faire tourner","spin","spun","spun"],["cracher","spit","spat / spit","spat / spit"],["fendre","split","split","split"],["gâcher / gâter","spoil","spoilt","spoilt"],["répandre","spread","spread","spread"],["surgir / jaillir / bondir","spring","sprang","sprung"],["être debout","stand","stood","stood"],["voler / dérober","steal","stole","stolen"],["coller","stick","stuck","stuck"],["piquer","sting","stung","stung"],["puer","stink","stank","stunk"],["éparpiller","strew","strewed","strewn / strewed"],["frapper","strike","struck","stricken / struck"],["s'efforcer","strive","strove","striven"],["jurer","swear","swore","sworn"],["suer","sweat","sweat / sweated","sweat / sweated"],["balayer","sweep","swept","swept"],["gonfler / enfler","swell","swelled","swollen / swelled"],["nager","swim","swam","swum"],["se balancer","swing","swung","swung"],["prendre","take","took","taken"],["enseigner","teach","taught","taught"],["déchirer","tear","tore","torn"],["dire / raconter","tell","told","told"],["penser","think","thought","thought"],["prospérer","thrive","throve / thrived","thriven / thrived"],["jeter","throw","threw","thrown"],["enfoncer","thrust","thrust","thrust"],["piétiner quelque chose","tread","trod","trodden"],["composer","typeset","typeset","typeset"],["subir","undergo","underwent","undergone"],["comprendre","understand","understood","understood"],["réveiller","wake","woke","woken"],["porter (avoir sur soi)","wear","wore","worn"],["pleurer","weep","wept","wept"],["mouiller","wet","wet / wetted","wet / wetted"],["gagner","win","won","won"],["enrouler / remonter","wind","wound","wound"],["se retirer","withdraw","withdrew","withdrawn"],["tordre","wring","wrung","wrung"]]
let [french, ...other] = verbes[2]
french = french.toUpperCase()
render = `${other.join(' / ')}`.toUpperCase()

searchImages(AUTH_KEY, french, config)
  .then( data => {
    loadImage(data.hits[0].largeImageURL).then( image => {
      posx = ( image.width - 1080 ) / 2
      posy = ( image.height - 1080 ) / 2

      const canvas = createCanvas(1080, image.height)
      const ctx = canvas.getContext('2d')

      ctx.drawImage(image, 0, 0, 1080, image.height);

      ctx.globalAlpha = 0.7
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, 1080, image.height);

      ctx.globalAlpha = 1
      ctx.fillStyle = "#FFFFFF";
      ctx.font = '80px Arial Black'
      ctx.textAlign = "center"; 
      ctx.textBaseline = "middle"
      ctx.fillText(french, 540, image.height * 0.4, 1080)

      ctx.font = '50px Arial Black'
      ctx.fillText(render, 540, image.height * 0.6, 1080)

      const stream = canvas.createPNGStream()
      stream.pipe(out)
      out.on('finish', () =>  {
        console.log('The PNG file was created.')
      })
  })
})