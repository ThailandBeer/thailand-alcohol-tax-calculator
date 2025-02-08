function updateTaxInfo() {
  const alcoholType = document.getElementById("alcoholType").value;
  let info = "";

  if (alcoholType === "beer") {
    info =
      "Beer Tax: 48% Ad Valorem. Specific tax: the higher of 155 Baht per liter of pure alcohol (calculated on first 7%) OR 8 Baht per liter. Additional 3 Baht per liter per degree for alcohol content exceeding 7%.";
  } else if (alcoholType === "wine") {
    info =
      "Wine Tax: 0% Ad Valorem if price ≤600 Baht, 36% if >600 Baht. Specific tax: the higher of 1000 Baht per liter of pure alcohol (calculated on first 15%) OR 225 Baht per liter. Additional 3 Baht per liter per degree for alcohol content exceeding 15%.";
  } else if (alcoholType === "spirits") {
    info =
      "Spirits Tax: 25% Ad Valorem. Specific tax: the higher of 250 Baht per liter of pure alcohol (calculated on first 45%) OR 50 Baht per liter. Additional 3 Baht per liter per degree for alcohol content exceeding 45%.";
  }
  document.getElementById("taxInfo").innerText = info;
}

function getAdValoremRate(type, price) {
  if (type === "beer") return 48;
  if (type === "wine") return price > 600 ? 36 : 0;
  if (type === "spirits") return 25;
  return 0;
}

function getSpecificTaxRate(type) {
  if (type === "beer") return 155;
  if (type === "wine") return 1000;
  if (type === "spirits") return 250;
  return 0;
}

function calculateTax() {
  const alcoholType = document.getElementById("alcoholType").value;
  const wholesalePrice = parseFloat(
    document.getElementById("wholesalePrice").value
  );
  const containerSize = parseFloat(
    document.getElementById("containerSize").value
  );
  const alcoholContent = parseFloat(
    document.getElementById("alcoholContent").value
  );
  let adValoremTax = 0,
    specificTax = 0,
    excessiveAlcoholTax = 0;

  if (alcoholType === "beer") {
    adValoremTax = wholesalePrice * 0.48;
    specificTax = Math.max(
      (containerSize * Math.min(alcoholContent, 7) * 155) / 100,
      containerSize * 8
    );
    if (alcoholContent > 7) {
      excessiveAlcoholTax = (alcoholContent - 7) * containerSize * 3;
    }
  } else if (alcoholType === "wine") {
    adValoremTax = wholesalePrice > 600 ? wholesalePrice * 0.36 : 0;
    specificTax = Math.max(
      (containerSize * Math.min(alcoholContent, 15) * 1000) / 100,
      containerSize * 225
    );
    if (alcoholContent > 15) {
      excessiveAlcoholTax = (alcoholContent - 15) * containerSize * 3;
    }
  } else if (alcoholType === "spirits") {
    adValoremTax = wholesalePrice * 0.25;
    specificTax = Math.max(
      (containerSize * Math.min(alcoholContent, 45) * 250) / 100,
      containerSize * 50
    );
    if (alcoholContent > 45) {
      excessiveAlcoholTax = (alcoholContent - 45) * containerSize * 3;
    }
  }

  let totalTax = adValoremTax + specificTax + excessiveAlcoholTax;
  let ministrySurcharge = totalTax * 0.1;
  let thaiHealthSurcharge = totalTax * 0.02;
  let publicBroadcastSurcharge = totalTax * 0.015;
  let surcharges =
    ministrySurcharge + thaiHealthSurcharge + publicBroadcastSurcharge;
  totalTax += surcharges;

  document.getElementById("result").innerText = `Total Tax: ${totalTax.toFixed(
    2
  )} THB`;
  document.getElementById("breakdown").innerHTML = `
            <h3 class="font-bold text-lg mt-4 border-b pb-2">Tax Breakdown</h3>
                      <div class="flex justify-between py-1">
                <span>Ad Valorem Tax (${getAdValoremRate(
                  alcoholType,
                  wholesalePrice
                )}%):</span> 
                <span>${adValoremTax.toFixed(2)} THB</span>
            </div>
            <div class="flex justify-between py-1"><span>Specific Tax (${getSpecificTaxRate(
              alcoholType
            )} Baht/liter of pure alcohol):</span> <span>${specificTax.toFixed(
    2
  )} THB</span></div>
            <div class="flex justify-between py-1"><span>Excessive Alcohol Tax (3%):</span> <span>${excessiveAlcoholTax.toFixed(
              2
            )} THB</span></div>

            <h3 class="font-bold text-lg mt-4 border-b pb-2">Sub Total Before Surcharges</h3>
            <div class="flex justify-between py-1 font-bold"><span>Subtotal Tax:</span> <span>${(
              adValoremTax +
              specificTax +
              excessiveAlcoholTax
            ).toFixed(2)} THB</span></div>
            
            <h3 class="font-bold text-lg mt-4 border-b pb-2">Surcharges</h3>
            <div class="flex justify-between py-1"><span>Ministry of Interior Surcharge (10%):</span> <span>${ministrySurcharge.toFixed(
              2
            )} THB</span></div>
            <div class="flex justify-between py-1"><span>Thai Health Promotion Surcharge (2%):</span> <span>${thaiHealthSurcharge.toFixed(
              2
            )} THB</span></div>
            <div class="flex justify-between py-1"><span>Public Broadcasting Surcharge (1.5%):</span> <span>${publicBroadcastSurcharge.toFixed(
              2
            )} THB</span></div>
            
            <h3 class="text-xl font-bold mt-4 border-t pt-2">Final Total</h3>
            <div class="flex justify-between text-lg font-bold py-2"><span>Total Tax:</span> <span>${totalTax.toFixed(
              2
            )} THB</span></div>
        `;
}

document.addEventListener("DOMContentLoaded", updateTaxInfo);
document.addEventListener("DOMContentLoaded", calculateTax);
