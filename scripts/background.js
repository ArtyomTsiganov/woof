chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
      chrome.storage.local.set({
        apiSuggestions: ['tabs', 'storage', 'scripting']
      });
      chrome.storage.local.set({
        d_name: {}
      });
    }
  });

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  if (tab != undefined) {
    let url = new URL(tab.url);
    save_logs(url.origin, 15);
  }
  
}

async function save_logs(name_v, value) {
    let d = await chrome.storage.local.get("d_name");
    console.log(d);
    if (name_v in d) {
      d[name_v] += value;
    } else {
      d[name_v] = value;
    }
    console.log(d);
    chrome.storage.local.set({"d_name" : d});
}

chrome.alarms.create('check-default-alarm', {
  delayInMinutes: 0.25,
  periodInMinutes: 0.25
});
console.log("alarm crated");

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "check-default-alarm") {
    getCurrentTab();
  }
});