const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]')

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', handleCheck)
})

let lastChecked

function handleCheck(e) {
    let inBetween = false // flag for the boxes to be checked

    // check if shift key is being pressed and the box is being checked
    if (e.shiftKey && this.checked && lastChecked) {
        // loop over every checkbox
        checkboxes.forEach((checkbox) => {
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween
            }

            if (inBetween) {
                checkbox.checked = true
            }
        })
    }
    lastChecked = this
}
