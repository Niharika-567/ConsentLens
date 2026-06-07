// The entire script runs inside an async function.
// This allows us to use 'await' to wait for network requests without freezing the browser.
(async () => {
    // 1. Define the risky keywords with a weighted scoring system.
    const riskyKeywords = {
        "sell your data": 3,
        "behavioral advertising": 2,
        "share with third parties": 2,
        "retained indefinitely": 1,
        "tracking cookies": 1,
        "personal data may be used for marketing": 1
    };

    let policyText = "";
    let riskScore = 0;

    // 2. Find the privacy policy link on the page using multiple checks.
    const links = Array.from(document.querySelectorAll('a'));
    let policyLink = links.find(link => {
        const text = link.innerText.toLowerCase();
        // First, check for "privacy policy" or "privacy statement"
        return (text.includes("privacy policy") || text.includes("privacy statement")) && link.href.includes("privacy");
    });

    // If a link wasn't found, try a broader search for a known URL pattern.
    if (!policyLink) {
      policyLink = links.find(link => link.href.includes("nytimes.com/privacy/"))
    }
    
    // 3. Check for the OneTrust domain in the page source code and add an explanation.
    const oneTrustFound = document.documentElement.innerHTML.includes('cdn.cookielaw.org');
    if (oneTrustFound) {
        riskScore += 5; // A high-impact score for a known tracker.
    }

    // 4. Fetch the policy text from the found URL.
    if (policyLink) {
        try {
            const response = await fetch(policyLink.href);
            policyText = await response.text();
        } catch (e) {
            policyText = "Could not fetch policy text.";
        }
    } else {
        policyText = "Privacy policy link not found.";
    }
    
    // 5. Analyze the text and calculate the risk score.
    const foundRisks = [];
    if (oneTrustFound) {
        foundRisks.push("Uses a privacy management platform like OneTrust.");
    }

    if (policyText && policyText !== "Privacy policy link not found." && policyText !== "Could not fetch policy text.") {
        for (const keyword in riskyKeywords) {
            if (policyText.toLowerCase().includes(keyword)) {
                riskScore += riskyKeywords[keyword];
                foundRisks.push(keyword);
            }
        }
    }

    // 6. Determine the summary based on the findings.
    let summary = "The privacy policy appears to be clean.";
    if (foundRisks.length > 0) {
        summary = `The policy contains the following risky clauses: ${foundRisks.join(", ")}.`;
    } else if (policyText === "Privacy policy link not found.") {
        summary = policyText;
    }

    // 7. Determine the risk level based on the weighted score.
    const riskLevel = riskScore > 4 ? "High Risk" : riskScore > 1 ? "Medium Risk" : "Low Risk";
    
    // 8. Send the results back to the popup.js script.
    chrome.runtime.sendMessage({
        action: "policyData",
        riskLevel: riskLevel,
        summary: summary
    });
})();