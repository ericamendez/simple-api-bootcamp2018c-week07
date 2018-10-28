// I want to create a function in which the user can enter the date and crypto
//and it will return the current vulue of that currencey
document.querySelector('form').addEventListener('submit', coin)

function coin(ev) {
  ev.preventDefault()
  let date = document.querySelector('#date').value
  console.log(date)
  fetch(`https://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      let choice = document.getElementById('options').value

      if (choice === "day") {
        forDay(response.bpi, date)
      } else if (choice === "month") {
        forMonth(response.bpi)
      }
    })
    .catch(err => {
      console.log(`error ${err}`)
      alert("sorry, there are no results for your search")
    });
}

function forDay(bpi, date) {
  document.getElementById('answer').textContent = ""
  let text = document.createTextNode("Currency on "+ date+": $"+bpi[date])
  let p = document.createElement('p')
  p.appendChild(text)
  document.getElementById('answer').append(p)
}

function forMonth(bpi) {
  for (let date in bpi) {
    let text = document.createTextNode("Currency on "+ date+": $"+bpi[date])
    let p = document.createElement('p')
    p.appendChild(text)
    document.getElementById('answer').append(p)
  }
}
