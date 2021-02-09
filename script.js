var topBar = document.createElement('div')
topBar.classList.add('topBar')
topBar.innerHTML = 'Space-X Launch Info Hub'
document.body.append(topBar)

var mainMes = document.createElement('div')
mainMes.innerHTML = 'Select Upcoming Or Past Launch And Use Arrow To Go Through.'
mainMes.classList.add('mainMes')
document.body.append(mainMes)

var masterContainer = document.createElement('div')
masterContainer.classList.add('container')
masterContainer.setAttribute('style','position:relative;height:650px;')
document.body.append(masterContainer)

var mainBox = document.createElement('div')
mainBox.classList.add('container','mainBox')
masterContainer.append(mainBox)

var mainBar=document.createElement('div')
mainBar.classList.add('row','mainBar')
mainBox.append(mainBar)

var upcomingButton = document.createElement('button')
upcomingButton.type = 'button'
upcomingButton.value='upcomingButton'
upcomingButton.innerHTML='Upcoming Launches'
upcomingButton.
classList.add('col-6','mainButtons')
upcomingButton.setAttribute('onClick','upcomingLaunch(this)')

var pastButton = document.createElement('button')
pastButton.type = 'button'
pastButton.value='pastButton'
pastButton.innerHTML='Past Launches'
pastButton.classList.add('col-6','mainButtons')
pastButton.setAttribute('onClick','pastLaunch(this)')

mainBar.append(pastButton,upcomingButton)

var dispRow = document.createElement('div')
dispRow.classList.add('row','dispRow')
mainBox.append(dispRow)
//dispRow.innerHTML = "HI"

var leftArrow = document.createElement('div')
leftArrow.classList.add('col-1')
//leftArrow.innerHTML='<'
dispRow.append(leftArrow)


var dispArea = document.createElement('div')
dispArea.classList.add('col-10','dispArea')
dispRow.append(dispArea)


var rightArrow = document.createElement('div')
rightArrow.classList.add('col-1')
rightArrow.setAttribute('style','text-align:right')
//rightArrow.innerHTML='>'
dispRow.append(rightArrow)


var dispCard = document.createElement('div')
dispCard.classList.add('container','dispCard')
dispArea.append(dispCard)

var left = document.createElement('button')
left.type ='button'
left.id='leftbutton'
left.classList.add('buttons')
left.innerHTML ='<'
left.setAttribute('onclick','prev(this)')
leftArrow.append(left)

var right = document.createElement('button')
right.type ='button'
right.id='rightbutton'
right.classList.add('buttons')
right.innerHTML ='>'
right.setAttribute('onclick','next(this)')
rightArrow.append(right)

var finalRow = document.createElement('div')
finalRow.classList.add('row','finalRow')
dispCard.append(finalRow)

var pixObj = document.createElement('div')
pixObj.classList.add('col-6','pixObj')
finalRow.append(pixObj)

var pixCard = document.createElement('img')
pixCard.classList.add('pix')
pixObj.append(pixCard)
var mesCard = document.createElement('div')
pixObj.append(mesCard)


var detailsCard = document.createElement('div')
detailsCard.classList.add('detailsCard','col-6')
finalRow.append(detailsCard)




var upcomingURL = 'https://api.spacexdata.com/v4/launches/upcoming'

var pastURL = 'https://api.spacexdata.com/v4/launches/past'

var masterData = ''

var mainId =''

var count = -1



function upcomingLaunch(ele){

   detailsCard.innerHTML='Use arrows to navigate.'
   mesCard.innerHTML=''
   pixCard.src = ' '
   count = -1

fetch(upcomingURL)
.then(resp=>resp.json())
.then((result)=>{



    masterData = result
    console.log(masterData)

    mainID = ele.value
    console.log(mainID)


})
                
}

function pastLaunch(ele)
{

    detailsCard.innerHTML='Use arrows to navigate.'
    mesCard.innerHTML=''
    pixCard.src = ' '
    count = -1

    fetch(pastURL)
    .then(resp=>resp.json())
    .then((result)=>{
    
        masterData = result
        console.log(masterData)

        mainID = ele.value
        console.log(mainID)
    
    
    })

}

function next(ele){
    if(count<masterData.length-1)
    ++count

    console.log(count)

    
        if(masterData[count].links.flickr.original.length!=0)
        {console.log(masterData[count].links.flickr.original[0])
        pixCard.src = masterData[count].links.flickr.original[0]
        mesCard.innerHTML=''
        }
        else
        {
            pixCard.src = ' '
        mesCard.innerHTML = 'Pic Unavailable, Check Back Later.'}
    

        detailsCard.innerHTML=''

        var launchName = document.createElement('div')
        launchName.innerHTML = "<br>Launch Name:&nbsp" +masterData[count].name
        launchName.classList.add('adjust')
        detailsCard.append(launchName)

        var launchDate = document.createElement('div')
        launchDate.classList.add('adjust')
        launchDate.innerHTML = "<br>Launch Date, Local Time:&nbsp" +masterData[count].date_local
        detailsCard.append(launchDate)

        var fnumber = document.createElement('div')
        fnumber.classList.add('adjust')
        fnumber.innerHTML = "<br>Flight Number:&nbsp" +masterData[count].flight_number
        detailsCard.append(fnumber)

        var det = document.createElement('div')
        det.classList.add('adjust')
        det.innerHTML = "<br>Details:&nbsp" +masterData[count].details
        detailsCard.append(det)

        var reddit = document.createElement('div')
        reddit.classList.add('adjust')
        var holdlink = document.createElement('a')
       // holdlink.classList.add('adjust')
       if(masterData[count].links.reddit.campaign==null)
       {
        holdlink.href= 'https://www.youtube.com/watch?v=SkgTxQm9DWM'
        holdlink.innerHTML='<br>No Reddit Campaign To Show. Instead Enjoy This Nayan Cat Video'
       }
       else{
        holdlink.href= masterData[count].links.reddit.campaign
        holdlink.innerHTML='<br>Reddit Campaign: Read More here'
       }
        reddit.append(holdlink)
        detailsCard.append(reddit)

        var rocketID= masterData[count].rocket
        console.log(rocketID)

        var rocketdetails = document.createElement('div')
        rocketdetails.classList.add('adjust')
        detailsCard.append(rocketdetails)

        var rocketName = document.createElement('div')
        rocketName.classList.add('adjust')
        var rocketDet = document.createElement('div')
        rocketDet.classList.add('adjust')
        var cost = document.createElement('div')
        cost.classList.add('adjust')

        rocketdetails.append(rocketName,rocketDet,cost)

        fetch('https://api.spacexdata.com/v4/rockets/'+rocketID)
        .then(resp=>resp.json())
        .then(result=>{
            console.log(result)
            rocketName.innerHTML = 'Rocket Details:<br><br>Name -&nbsp' +result.name
            rocketDet.innerHTML = '<br>Description -&nbsp'+ result.description
            cost.innerHTML = '<br>Cost Per launch -&nbsp'+result.cost_per_launch +'&nbspUSD'

        })





}

function prev(ele){
    if(count>0)
    --count

    console.log(count)

    
        if(masterData[count].links.flickr.original.length!=0)
        {console.log(masterData[count].links.flickr.original[0])    
        pixCard.src = masterData[count].links.flickr.original[0]
        mesCard.innerHTML=''
        }
        else
        {
        pixCard.src = ' '
        mesCard.innerHTML = 'Pic Unavailable, Check Back Later.'}
    

        detailsCard.innerHTML=''

        var launchName = document.createElement('div')
        launchName.innerHTML = "<br>Launch Name:&nbsp" +masterData[count].name
        launchName.classList.add('adjust')
        detailsCard.append(launchName)

        var launchDate = document.createElement('div')
        launchDate.classList.add('adjust')
        launchDate.innerHTML = "<br>Launch Date, Local Time:&nbsp" +masterData[count].date_local
        detailsCard.append(launchDate)

        var fnumber = document.createElement('div')
        fnumber.classList.add('adjust')
        fnumber.innerHTML = "<br>Flight Number:&nbsp" +masterData[count].flight_number
        detailsCard.append(fnumber)

        var det = document.createElement('div')
        det.classList.add('adjust')
        det.innerHTML = "<br>Details:&nbsp" +masterData[count].details
        detailsCard.append(det)

        var reddit = document.createElement('div')
        reddit.classList.add('adjust')
        var holdlink = document.createElement('a')
       // holdlink.classList.add('adjust')
       if(masterData[count].links.reddit.campaign==null)
       {
        holdlink.href= 'https://www.youtube.com/watch?v=SkgTxQm9DWM'
        holdlink.innerHTML='<br>No Reddit Campaign To Show. Instead Enjoy This Nayan Cat Video'
       }
       else{
        holdlink.href= masterData[count].links.reddit.campaign
        holdlink.innerHTML='<br>Reddit Campaign: Read More here'
       }
        reddit.append(holdlink)
        detailsCard.append(reddit)

        var rocketID= masterData[count].rocket
        console.log(rocketID)

        var rocketdetails = document.createElement('div')
        rocketdetails.classList.add('adjust')
        detailsCard.append(rocketdetails)

        var rocketName = document.createElement('div')
        rocketName.classList.add('adjust')
        var rocketDet = document.createElement('div')
        rocketDet.classList.add('adjust')
        var cost = document.createElement('div')
        cost.classList.add('adjust')

        rocketdetails.append(rocketName,rocketDet,cost)

        fetch('https://api.spacexdata.com/v4/rockets/'+rocketID)
        .then(resp=>resp.json())
        .then(result=>{
            console.log(result)
            rocketName.innerHTML = 'Rocket Details:<br><br>Name -&nbsp' +result.name
            rocketDet.innerHTML = '<br>Description -&nbsp'+ result.description
            cost.innerHTML = '<br>Cost Per launch -&nbsp'+result.cost_per_launch +'&nbspUSD'

        })

}

var foot = document.createElement('footer')
foot.innerHTML='Powered By Space-X API'
foot.classList.add('footer')
document.body.append(foot)