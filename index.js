let myLeads = []
const input_box = document.getElementById("input-el") // read or edit an HTML element.
const input_button  = document.getElementById("input-btn")
const unordered_list = document.getElementById("ul-el")
const delete_button = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tab_button = document.getElementById("tab-btn")

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
    unordered_list.innerHTML = listItems
}

tab_button.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){ // active --> activeTab || currentWindow --> activeWindow 
        myLeads.push(tabs[0].url) // The chrome.tabs.query() function retrieves an array of tab objects that match the specified query. 
        //the query filters the active tab in the current window. 
        //Since the query is restricted to the current active tab, tabs[0] refers to the first (and only) result in this array—representing the active tab.
        //tabs[0].url: This accesses the url property of the active tab. The url is the current web address (e.g., "https://example.com") of the tab.
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

delete_button.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

input_button .addEventListener("click", function() {
    myLeads.push(input_box.value)
    input_box.value = "" 
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
