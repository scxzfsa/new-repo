// Function to get balance in ether
async function getETHBalance() {
    try {
        const response = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&address=0xDaE6d9662C4904026AC311a5fDc8917FDc51971A&tag=latest&apikey=INSERT YOUR KEY HERE');
        const data = await response.json();

        if (data.status === '1') {
            const balanceWei = data.result;
            const balanceEther = balanceWei / Math.pow(10, 18);

            const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=weth&vs_currencies=usd');
            const priceData = await priceResponse.json();

            const priceUSD = priceData.weth.usd;
            const balanceUSD = (balanceEther * priceUSD).toFixed(2);
            const finalResult = (balanceUSD * 2).toFixed(2);

            // Update input box value with final result
            document.getElementById('bttvl').value = finalResult;
        } else {
            console.log('API request failed');
        }
    } catch (error) {
        console.log(error);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('tvlBtn');
    button.addEventListener('click', getETHBalance);
  });

// Function to get BTC balance in wei
async function getBTCBalance() {
    try {
        const response = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599&address=0x96D683A35e7af3faeb18AA73C077DBB77096332E&tag=latest&apikey=INSERT YOUR KEY HERE');
        const data = await response.json();

        if (data.status === '1') {
            const balanceWei = data.result;
            const balanceEther = balanceWei / Math.pow(10, 8);

            const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
            const priceData = await priceResponse.json();

            const priceUSD = priceData.bitcoin.usd;
            const balanceUSD = (balanceEther * priceUSD).toFixed(2);

            // Update input box value with final result
            document.getElementById('btassets').value = balanceUSD;
        } else {
            console.log('API request failed');
        }
    } catch (error) {
        console.log(error);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('assetBtn');
    button.addEventListener('click', getBTCBalance);
  });