'use strict'
let askSaveDiv = document.createElement('div')
let theDivThatsActuallyAskingForSave = document.createElement('div')
let theGoodAcceptButton = document.createElement('button')
let theUglyDeclineButton = document.createElement('button')
let save = false
let _gameDiv = document.createElement('div')
let toggleSaveButton = document.createElement('button')
toggleSaveButton.textContent = 'Toggle Local Storage Permission'
toggleSaveButton.style.bottom = '32px'
toggleSaveButton.classList.add('importantStuff')
toggleSaveButton.onclick = () => {
    save = !save
    if (!save) return localStorage.clear()
    localStorage.setItem('save', 'true')
}
let destroyAskSaveDiv = () => {
    askSaveDiv.remove()
    document.body.append(_gameDiv)
    document.body.append(toggleSaveButton)
}
theDivThatsActuallyAskingForSave.textContent = 'Allow saving???\n(By allowing this, you allow me to use local storage in my code)'
theGoodAcceptButton.textContent = 'ok'
theGoodAcceptButton.style.marginRight = '5px'
theUglyDeclineButton.textContent = 'NO I NEVER ALLOW COOKIES'
theGoodAcceptButton.onclick = () => {
    save = true
    destroyAskSaveDiv()
    localStorage.setItem('save', 'true')
}
theUglyDeclineButton.onclick = () => destroyAskSaveDiv()
askSaveDiv.append(theDivThatsActuallyAskingForSave, theGoodAcceptButton, theUglyDeclineButton)
document.body.append(askSaveDiv)
if (localStorage.getItem('save')) {
    destroyAskSaveDiv()
    save = true
    document.body.append(_gameDiv)
}
Node.prototype.loreyDisplay = async function(text = '', msInbetween = 50, before = '', after = '') {
    let div = document.createElement('div')
    this.appendChild(div)
    let textRn = ''
    for (let char of text) {
        textRn += char
        div.textContent = `${before}${textRn}${after}`
        if (textRn !== text) await new Promise(resolve => setTimeout(resolve, msInbetween))
    }
    return div
}
Node.prototype.waitForResponse = async function(buttonText = 'Respond') {
    let [input, button] = [document.createElement('input'), document.createElement('button')]
    this.appendChild(input)
    button.textContent = buttonText
    this.appendChild(button)
    let response
    await new Promise(resolve => {
        button.onclick = () => {
            response = input.value
            resolve()
        }
    })
    return [response, input, button]
}
let keys = new Set([])
addEventListener('keydown', ev => keys.add(ev.key))
addEventListener('keyup', ev => keys.delete(ev.key))
let newsDiv = document.createElement('div')
newsDiv.style.position = 'absolute'
let origWidth = newsDiv.getBoundingClientRect().width
let moving = false
let repositionNewsDiv = () => {
    newsDiv.style.left = ''
    newsDiv.style.right = `${-parseFloat(newsDiv.getBoundingClientRect().width)}px`
    newsDiv.style.width = 'auto'
    origWidth = newsDiv.getBoundingClientRect().width
    newsDiv.style.width = `${origWidth}px`
    newsDiv.style.right = `${-parseFloat(newsDiv.getBoundingClientRect().width)}px`
}
let newsTexts = ['Hello, this was made on 12/16/2020, version made on 2/3/2023.', 'This is definently a normal incremental.', `Is it weird when people say &im`, `Times you encountered this before: &ci1`, 'Hello Fieler, I\'m Austin.']
let A = JSON.parse(localStorage.getItem('A')) || 0
let counter1 = 0n
if (localStorage.getItem('&ci1') && save) counter1 = BigInt(localStorage.getItem('&ci1'))
let getRandomNewsText = () => {
    let normal = newsTexts[Math.floor(Math.random() * newsTexts.length)]
    let modified = normal.replace(/&im/g, modifyNumber(A)).replace(/&ci1/g, counter1)
    if (!normal.includes('&ci1')) return modified
    counter1++
    if (save) localStorage.setItem('&ci1', counter1.toString())
    return modified
}
newsDiv.textContent = getRandomNewsText()
newsDiv.style.whiteSpace = 'nowrap'
addEventListener('resize', () => repositionNewsDiv())
_gameDiv.append(newsDiv)
repositionNewsDiv()
let scrollLeftAndRespawn = () => {
    newsDiv.style.left = `${newsDiv.getBoundingClientRect().left - 4}px`
    if (newsDiv.getBoundingClientRect().left < -origWidth) {
        newsDiv.textContent = getRandomNewsText()
        repositionNewsDiv()
    }
    return requestAnimationFrame(scrollLeftAndRespawn)
}
requestAnimationFrame(scrollLeftAndRespawn)
let otherStuff1 = document.createElement('div')
otherStuff1.style.position = 'absolute'
otherStuff1.style.top = '42px'
_gameDiv.append(otherStuff1)
let hr = document.createElement('hr')
otherStuff1.style.left = '0px'
otherStuff1.style.width = '100%'
hr.style.margin = '0px'
let AdisplayDiv = document.createElement('div')
AdisplayDiv.id = 'AdisplayDiv1'
function modifyNumber(n) {
    let int = Math.round(n)
    let e = int.toString().length - 1
    let firstDigits = fixDecimal((int / 10 ** e).toFixed(2))
    return `${firstDigits}e${e}`
}
let displayingA = () => {
    AdisplayDiv.textContent = modifyNumber(A)
    return requestAnimationFrame(displayingA)
}
requestAnimationFrame(displayingA)
let aUpgrades1 = JSON.parse(localStorage.getItem('Aupg1')) || 0
let firstButton = document.createElement('button')
firstButton.textContent = 'Click to begin earning A'
let loreDiv1 = document.createElement('div')
let firstLored = false
let lorePart = async() => {
    if (1e2 * 10 ** (Math.floor(aUpgrades1 / 10)) < 1e10 || firstLored) return
    firstButton.remove()
    otherStuff1.append(loreDiv1)
    firstLored = true
    await loreDiv1.loreyDisplay('Hi Fieler.').then(async(elem) => {
        await new Promise(resolve => setTimeout(resolve, 3000))
        elem.remove()
    })
    await loreDiv1.loreyDisplay('I heard you have 80 A generator upgrades').then(async(elem) => {
        await new Promise(resolve => setTimeout(resolve, 3000))
        elem.remove()
    })
    {
        let question = await loreDiv1.loreyDisplay('Do you wanna VrooM now?')
        await loreDiv1.waitForResponse().then(([, input, button]) => {
            input.remove()
            button.remove()
        })
        question.remove()
    }
    await loreDiv1.loreyDisplay('I don\'t know what it is but I\'ve heard it helps generate A').then(async(elem) => {
        await new Promise(resolve => setTimeout(resolve, 3000))
        elem.remove()
    })
    await loreDiv1.loreyDisplay('WIP')
}
firstButton.onclick = () => {
    requestAnimationFrame(startEarningA)
    firstButton.id = 'firstButton1MaybeIdk'
    firstButton.textContent = modifyNumber(1e2 * 10 ** (Math.floor(aUpgrades1 / 10)))
    firstButton.onclick = async() => {
        lorePart()
        if (firstLored) return
        if (A < 1e2 * 10 ** (Math.floor(aUpgrades1 / 10))) return
        A -= 1e2 * 10 ** (Math.floor(aUpgrades1 / 10))
        aUpgrades1 += 1
        firstButton.textContent = modifyNumber(1e2 * 10 ** (Math.floor(aUpgrades1 / 10)))
        if (save) {
            localStorage.setItem('Aupg1', JSON.stringify(aUpgrades1))
            localStorage.setItem('A', JSON.stringify(A))
        }
    }
}
if (aUpgrades1) firstButton.onclick()
otherStuff1.append(hr, AdisplayDiv, firstButton)
async function startEarningA() {
    A += aUpgrades1 + 1 + ((1 + aUpgrades1) * 6 ** Math.floor(aUpgrades1 / 10) * 8)
    if (save) localStorage.setItem('A', JSON.stringify(A))
    await new Promise(resolve => setTimeout(resolve, 100))
    return requestAnimationFrame(startEarningA)
}
function fixDecimal(n) {
    if (!n.includes('.')) return n
    let arr = n.split('.')
    for (let [i, digit] of Object.entries(arr[1].split('').reverse())) {
        if (digit === '0') continue
        if (i !== '0') arr[1] = arr[1].slice(0, `-${i}`)
        break
    }
    if (arr[1][arr[1].length - 1] === '0') arr.pop()
    return arr.join('.')
}
lorePart()
let keyHoldSystem = function() {
    return requestAnimationFrame(keyHoldSystem)
}
requestAnimationFrame(keyHoldSystem)
firstButton.addEventListener('keydown', ev => {
    if (ev.key !== ' ') return
    firstButton.onclick()
})
let versionDiv = document.createElement('div')
versionDiv.textContent = `AOI1 NVMy vD.1-za0s)`
versionDiv.classList.add('importantStuff')
versionDiv.style.bottom = '16px'
let licenseDiv = document.createElement('div')
licenseDiv.textContent = `Austin's Ordinary Incremental 1 © 2020 by Austin is licensed under Attribution 4.0 International. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/`
licenseDiv.classList.add('importantStuff')
licenseDiv.style.bottom = '0px'
document.body.append(versionDiv, licenseDiv)
// todo add VrooM