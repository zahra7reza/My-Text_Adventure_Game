const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

// The text nodes is what makes the text show up for the adventure game.
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id == textNodeIndex);
  textElement.innerText = textNode.text;
  // optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  optionButtonsElement.innerHTML = "";
  // console.log(textNode.options);
  // if room does not have bg color, code may break
  // trying to set bgcolor of element to undefined
  // wrap VV if statement
  // make sure all rooms have bg field
  document.getElementById("bg").style.backgroundColor = textNode.bg;
  textNode.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectOption(option));
    optionButtonsElement.appendChild(button);
  });
}

function selectOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

// These text nodes are regarding what the text will say and in which order.
// The set states depends on which option the player chooses.
const textNodes = [
  {
    id: 1,
    bg: "black",
    text: "You wake up in the middle of a forest and you see a chest right in front of you. You open the chest and see a note in it. You read the note, which reveals what is through the blue door.",
    options: [
      {
        text: "Stay in the forest",
        setState: { stay: false },
        nextText: 2,
      },
      {
        text: "Go through the blue door",
        setState: { blueDoor: true },
        nextText: 3,
      },
    ],
  },
  {
    id: 2,
    bg: "black",
    text: "Whilst deciding to stay out in the forest, you get killed by a pack of wolves.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 3,
    bg: "#000080",
    text: "Once inside the blue room, you look around and everything is blue with white illuminating light complimenting the room. The room is packed with poeple laughing and joking, talking and smoking, music is playing loud in the background. There is a bar to the left of the room. You see a bar tender waving at you to go to the bar. At the bar, the bar tender says 'Hi there, you need this key to unlock the last door.",
    options: [
      {
        text: "Pick up the key and leave",
        setState: { pickUpKey: true },
        nextText: 4,
      },
      {
        text: "You stay in the blue room",
        setState: { stay: false },
        nextText: 5,
      },
    ],
  },
  {
    id: 4,
    bg: "#FFD700",
    text: "As you pick up the key a yellow door appeears behind you. You turn around a walk through the door. The whole room is yellow with white illuminating light complimenting the room...a common theme in the game. As you look around the room it looks like a beach, with sand and water which encapsulates the sea. There are beach towels, deck chairs, balls, sand castles all of the place. You notice an ice cream van and a long queue. A woman walks up to you and says 'here, take this potion, it will do you good, come the big fight'.",
    options: [
      {
        text: "Ignore the woman",
        setState: { ignoreWoman: false },
        nextText: 6,
      },
      {
        text: "Take the potion and leave",
        setState: { takePotion: true },
        nextText: 7,
      },
    ],
  },
  {
    id: 5,
    bg: "#000080",
    text: "You stay in the blue room and a commotion happens and you end up in a middle of a fight.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    bg: "#FFD700",
    text: "You ignore the woman and as you walk away you get swallowed up by the sand.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 7,
    bg: "#2C6700",
    text: "As you take the potion a green door appears right in front of you, You open the door and walk through. Inside the green room, you look around and everything is green. Green walls, white illuminating light complimenting the room. Green plants and trees, the room looks like a jungle. You also see wild insects flying around the room. As you look straight ahead, you see a waterfall",
    options: [
      {
        text: "Walk into the waterfall and pick up the shield",
        setState: { shield: true },
        nextText: 8,
      },
      {
        text: "Decide to stay and look at the exotic plants and trees",
        nextText: 9,
        setState: { stay: false },
      },
    ],
  },
  {
    id: 8,
    bg: "#B22222",
    text: "You pick the shield and a red door appears behind the waterfall, you look up, see the door, and walk through. In the red room, everything is red with white illuminating white light around the room. No one is there...so it seems. You see a hugh vault in the middle of the room. You walk up to the vault and an man jumps up from behind the vault and says 'The passcode is 1958'.",
    options: [
      {
        text: "You type the passcode on the vault",
        setState: { passcode: true },
        nextText: 10,
      },
      {
        text: "You decide to stay in the roon",
        setState: { stay: false },
        nextText: 11,
      },
    ],
  },
  {
    id: 9,
    bg: "#2C6700",
    text: "Whilst walking around, you see a massive mutated Venus FlyTrap. As you look up at it, it eats you.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    bg: "white",
    text: "After typing the passcode on the vault, it opens up and you see a steel sword. Once you pick the sword up a white door appears behind you and the man says 'It's time'. You turn around, walk towards the door and take the key out of your pocket and unlock the white door. Once unlocked you open the door and walk through and everything is white, apart from a long black chair in the middle of the room. While walking towards the chair, it turns around and there he is sitting on it....the enemny boss. He shouts 'GET HIM!!!'. Four enemy guards jump down and start running towards you. You dodge, dive and dip fighting the enemys. You eliminate two, but two remain.",
    options: [
      {
        text: "You continue to fight",
        setState: { fight: true },
        nextText: 12,
      },
      {
        text: "You run out the door",
        setState: { runOutTheDoor: false },
        nextText: 13,
      },
    ],
  },
  {
    id: 11,
    bg: "#B22222",
    text: "Whilst you stay in the room, the man pops up from behind the vault and uses his blowgun to fire a poisonous dart straight at your neck, after a minute you drop dead.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 12,
    bg: "white",
    text: "You have been fighting the last two guards for five minutes when you manage to eliminate them. You're tired, weak and on your knees, you have wounds all over your body, but you remember that you have a potion in your pocket. You look up and see the boss enemy charging at you.",
    options: [
      {
        text: "You carry on fighting",
        setState: { continueFighting: false },
        nextText: 14,
      },
      {
        text: "You drink the potion",
        setState: { drinkPotion: true },
        nextText: 15,
      },
    ],
  },
  {
    id: 13,
    bg: "black",
    text: "You run out the door and fall down into an abyss.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 14,
    bg: "black",
    text: "You attempt to get up and fight, but due to being so weak the boss enemy eliminates you.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 15,
    bg: "white",
    text: "You drink the potion and you dodge the enemy boss's charge. Your health has been regenerated and you are full of energy, but you know that it will take alot out of you to defeat the boss enemy. Kicks and punches have been thrown around, sheilds and swords have been used to as defence and attack moves. You and the boss enemy have been fighting for a long time to the point where one last attack will kill either.",
    options: [
      {
        text: "You manage to side step the boss enemy and slay him",
        setState: { slay: true },
        nextText: 16,
      },
    ],
  },
  {
    id: 16,
    bg: "black",
    text: "You wake up and realise it was all a dream.",
    options: [
      {
        text: "Nice one. Play again.",
        nextText: -1,
      },
    ],
  },
];

// Below indicates that the game will start.
startGame();

// This event listener is regarding the background music of a website.
// I have changed the volume of the background music from 0.2 to 0.008 so the music is not that loud.
window.addEventListener("DOMContentLoaded", (event) => {
  const audio = document.querySelector("audio");
  audio.volume = 0.008;
  audio.play();
});
// https://pixabay.com/users/lesfm-22579021/
// Lesfm is the creator of the music played in the brackground, music credit goes to him.
// pixabay.com is the website used to download the music.
