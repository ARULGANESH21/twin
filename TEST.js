let responses = JSON.parse(localStorage.getItem('responses')) || [];

function storeResponse() {
  // Get form values
  const name = document.getElementById('name').value.trim();
  const gender = document.getElementById('gender').value.trim();
  const favColor = document.getElementById('favColor').value.trim();
  const favHero = document.getElementById('favHero').value.trim();
  const favHeroine = document.getElementById('favHeroine').value.trim();
  const favPlace = document.getElementById('favPlace').value.trim();
  const favHobby = document.getElementById('favHobby').value.trim();
  const favFood = document.getElementById('favFood').value.trim();

  // Validate inputs
  if (!name || !gender || !favColor || !favHero || !favHeroine || !favPlace || !favHobby || !favFood) {
    alert("All fields must be filled out.");
    return;  // Prevent form submission
  }

  // Store the response
  const newResponse = { name, gender, favColor, favHero, favHeroine, favPlace, favHobby, favFood };
  responses.push(newResponse);

  // Check for twins (add the new response before checking)
  const twinMessage = findTwins(newResponse);
  document.getElementById('twinMessage').innerText = twinMessage;

  // Store responses in local storage
  localStorage.setItem('responses', JSON.stringify(responses));

  // Reset form fields
  document.getElementById('responseForm').reset();

  alert("Response saved!");
}

function findTwins(newResponse) {
  let twinGroups = [];
  let output = "";

  // Compare with all previous responses
  for (let i = 0; i < responses.length - 1; i++) {
    let common = 0;

    // Compare responses (excluding the name field)
    for (let key in responses[i]) {
      if (key !== "name" && responses[i][key] === newResponse[key]) {
        common++;
      }
    }

    // Check for similarity threshold (4 or more common attributes)
    if (common >= 4) {
      twinGroups.push(`${responses[i].name} and ${newResponse.name}`);
    }
  }

  // Format output message
  if (twinGroups.length > 0) {
    output = "Twins found:\n" + twinGroups.join("\n");
  } else {
    output = "You have no twins!";
  }

  return output;
}
