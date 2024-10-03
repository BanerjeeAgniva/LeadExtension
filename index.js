let myLeads = []
const inputEl = document.getElementById("input-el") // read or edit an HTML element.
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) { // parameterized string!!
        listItems += `  
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){ // active --> activeTab || currentWindow --> activeWindow 
        myLeads.push(tabs[0].url) // The chrome.tabs.query() function retrieves an array of tab objects that match the specified query. 
        //the query filters the active tab in the current window. 
        //Since the query is restricted to the current active tab, tabs[0] refers to the first (and only) result in this array—representing the active tab.
        //tabs[0].url: This accesses the url property of the active tab. The url is the current web address (e.g., "https://example.com") of the tab.
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = "" 
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
