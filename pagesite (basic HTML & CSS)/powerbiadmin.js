// Import the Power BI client library
const powerbi = window['powerbi-client'];

// Function to embed the Power BI dashboard
function embedDashboard(containerId, embedUrl, accessToken, reportId) {
    const models = powerbi.models;

    // Configuration for embedding the Power BI dashboard
    const config = {
        type: 'report', // 'report' for embedding reports, 'dashboard' for embedding dashboards
        id: reportId,
        embedUrl: embedUrl,
        accessToken: accessToken,
        tokenType: models.TokenType.Embed,
        settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: true
        }
    };

    // Get the container element
    const container = document.getElementById(containerId);

    // Embed the Power BI dashboard
    powerbi.embed(container, config);
}

// Example usage for two dashboards
const embedUrl1 = 'https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID_1&groupId=YOUR_GROUP_ID';
const accessToken1 = 'YOUR_ACCESS_TOKEN_1';
const reportId1 = 'YOUR_REPORT_ID_1';

const embedUrl2 = 'https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID_2&groupId=YOUR_GROUP_ID';
const accessToken2 = 'YOUR_ACCESS_TOKEN_2';
const reportId2 = 'YOUR_REPORT_ID_2';

embedDashboard('dashboard1Container', embedUrl1, accessToken1, reportId1);
embedDashboard('dashboard2Container', embedUrl2, accessToken2, reportId2);
