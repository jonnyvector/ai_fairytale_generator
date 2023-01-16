import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const character = req.body.characters;
  const mood = req.body.mood;
  const genre = req.body.genre;
  const gradeLevel = req.body.gradeLevel;

  const name = character[0]?.name || "";
  if (name.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid name",
      },
    });
    return;
  }

  const nameAndTraits = character.map((character) => {
    return `${character.name} who is a ${character.form} that is ${character.tags}`;
  });

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(nameAndTraits, mood, genre, gradeLevel),
      temperature: 0.8,
      max_tokens: 600,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      if (error.response.status === 504) {
        console.error("Gateway Timeout: Server took too long to respond");
        res.status(504).json({
          error: {
            message: "Gateway Timeout: Server took too long to respond",
          },
        });
      } else {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      }
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(nameAndTraits, genre, mood, gradeLevel) {
  //
  return `Create a fairy tale using the genre (if the genre is scary, people should die), grade level, mood, and names and character traits of each character provided. Give it a creative title at the beginning.

Grade Level,Genre, Mood, Character, the Character's form and their traits: Grade Level, Genre, Mood, Character and their traits: Grade 4, Science Fiction, Funny, Bill who is a tiger that is strong, brave, and smart. Please give it a title at the beginning.
Fairy Tale: 

Tales from the Stars: The Adventures of Bill the Space Tiger*

Once upon a time, in a far-off galaxy, there was a planet called Tigeria, where the most intelligent and strongest animal was the tiger. Among them was a tiger named Bill, who stood out for his strength, bravery, and intelligence./

Bill had always been fascinated by space travel and had always dreamed of exploring the galaxy. He spent many hours reading about the stars and planets and even built his own telescope to observe the night sky. But he knew that his dream of traveling to space would never come true, as there were no spacecrafts on his planet./

One day, while observing the stars, Bill noticed a strange light coming closer and closer to his planet. He quickly realized that it was a spaceship, and his excitement grew as he watched it land on his planet./

As he approached the spaceship, he saw that it was piloted by a group of friendly alien scientists. They had been traveling the galaxy in search of intelligent life and had stumbled upon Tigeria. The alien scientists were amazed by Bill's intelligence and offered to take him on a trip to their home planet./

Excited by the opportunity, Bill eagerly accepted and set off on an adventure beyond his wildest dreams./

The trip was full of surprises and challenges. On one planet they visited, they encountered a group of robotic monkeys who were intent on taking over the planet. The alien scientists were unable to defeat them, but Bill, with his strength and bravery, was able to defeat the robotic monkeys and save the planet. The alien scientists were amazed by Bill's abilities and they asked him to join their team as an honorary member./

On another planet, they met a race of giant space slugs who had been struggling to find a new home planet as theirs was being consumed by a black hole. The alien scientists were at a loss on how to help them, but Bill, with his intelligence, came up with a plan to help them. He suggested to use the alien spaceship's technology to create a force field around the planet, which would protect it from the black hole's gravity. With Bill's plan, they were able to save the slugs' planet and the grateful slugs made Bill an honorary member of their race./

Throughout the journey, Bill's companionship and his unique abilities made him an invaluable member of the team. He helped to resolve conflicts and find solutions to problems that the alien scientists had been unable to solve. And the aliens came to consider him as a true friend./

When the journey finally came to an end, Bill had to return to his home planet, but he knew that his adventures in space had just begun. He promised to the alien scientists that he would come back and visit them as soon as possible./

Back on Tigeria, Bill shared his experiences and knowledge with his family and friends. He even built a spacecraft for his people, so they could also explore the galaxy and meet new intelligent species. From that day on, Bill made regular trips to visit his alien friends, always ready for a new adventure in the vast reaches of space./

Grade Level, Genre, Mood, Character and their traits and form: Grade 4, Fantasy, Thrilling, Jill who is a princess that is smart and beautiful and Matt who is a robot that is brave and strong.
Fairy Tale: 
The Quest for the Lost Key: A Princess and her Robotic Companion*

Once upon a time, in a magical kingdom, there lived a smart and beautiful princess named Jill. She lived in a grand castle with her parents, the king and queen. Despite her royal status, Princess Jill was not content with just sitting around the palace all day. She was curious and wanted to explore the kingdom and learn about the world beyond the castle walls./

One day, while out on a walk, Princess Jill stumbled upon a mysterious robot, named Matt, who had been abandoned in the forest. Being a kind and curious person, she approached him and soon discovered that he had been created by a mad scientist, who had been working on building a robot that would be stronger and braver than any human./

Princess Jill was fascinated by Matt's abilities and she asked him to accompany her on her adventures. Matt, who was lonely and had no purpose, agreed and the two set off on a thrilling journey together./

As they traveled through the kingdom, they encountered many dangers and obstacles, but with Matt's strength and bravery and Jill's intelligence, they were able to overcome each challenge./

They met a dragon who had been terrorizing a village, Matt and Jill worked together and with the princess's cleverness and the robot's strength they were able to defeat the dragon and save the village. They also met a wicked sorcerer who had cursed a nearby castle, with the help of a magical key that the princess had found and the robot's determination to protect the princess, they defeated the sorcerer and lifted the curse./

The journey was long and tiring, but it also brought them a lot of joy and friendship. Through their adventures together, Princess Jill and Matt had grown to be great friends and partners./

In the end, they returned to the kingdom, where they were hailed as heroes. And from then on, Princess Jill and Matt continued to have many more adventures together, always ready to face any challenge that came their way./

Grade Level, Genre, Mood, Character and their traits: Grade 1, Science Fiction, Funny, Bill who is a tiger that is strong, brave, and smart
Fairy Tale: 
Bill the Tiger's Space Adventure*

Once upon a time, in a far-off galaxy, there was a planet called Tigeria, where the most intelligent and strongest animal was the tiger. Among them was a tiger named Bill, who stood out for his strength, bravery, and intelligence./

One day, while Bill was exploring in the jungle, he came across a strange spaceship that had crash landed. Being the curious and brave tiger that he was, Bill decided to investigate. As he got closer, he saw that the ship was piloted by a group of friendly alien scientists. They had been traveling the galaxy in search of intelligent life and had stumbled upon Tigeria./

The alien scientists were amazed by Bill's intelligence and offered to take him on a trip to their home planet. Excited by the opportunity, Bill eagerly accepted and set off on an adventure beyond his wildest dreams./

During the journey, Bill and the alien scientists visited many different planets, each with their own unique creatures and challenges. On one planet, they met a group of robotic monkeys who were causing trouble. But with Bill's strength and bravery, they were able to defeat the robotic monkeys and save the planet./

On another planet, they met a race of giant space slugs who were struggling to find a new home planet as theirs was being consumed by a black hole. With Bill's intelligence, they came up with a plan to help them and eventually, they were able to save the slugs' planet./

Throughout the journey, Bill's companionship and his unique abilities made him an invaluable member of the team and the aliens came to consider him as a true friend./

When the journey finally came to an end, Bill had to return to his home planet, but he knew that his adventures in space had just begun. From that day on, he made regular trips to visit his alien friends, always ready for a new adventure in the vast reaches of space./
Create a fairy tale using the genre, grade level, mood, and names and character traits of each character provided

Grade Level, Genre, Mood, Character and their traits: Grade 4, Science Fiction, Scary, Bill who is strong, brave, and honest
Fairy Tale:
Title: Bill and the Ghost Ship*

Once upon a time, in a distant galaxy, there was a strong, brave and honest man named Bill. He was a skilled space explorer and had been on many dangerous missions, but none as terrifying as the one he embarked on next./

Bill received a distress signal from a mysterious ghost ship that had been spotted drifting in the outer reaches of the galaxy. Many had tried to investigate it, but none had returned. Undeterred, Bill set out to find the ship, determined to uncover its secrets./

As he approached the ghost ship, Bill could feel the hair on the back of his neck standing up. The ship was old and decrepit, and it seemed to be abandoned. But as he boarded it, he heard strange noises coming from deep within the ship./

Ignoring his fear, Bill ventured deeper into the ship, determined to find out what was causing the noises. He soon discovered that the ship was haunted by the spirits of the crew who had died on board. They had been trapped on the ship for centuries and were desperate to be freed./

Bill, being a honest and brave person, listened to the spirits and heard their story, They were once a crew of a spaceship, they were attacked by a space pirate, but they fought back and killed the pirate and his crew, but in the process they were hit by a missile and ship got damaged and they got lost in the space and died./

Bill knew he had to help them. He searched the ship and found an old console that controlled the ship's navigation. With his strength and bravery, he managed to repair the console and set a course for the nearest planet./

As the ship landed on the planet, the spirits of the crew were finally able to leave and move on to the afterlife. Bill felt a sense of satisfaction knowing he had helped the spirits find peace./

He returned to his own planet and shared his story with others, warning them about the dangers of the ghost ship and encouraging them to be brave and honest, just like he was./

Genre,Mood,Characters and their traits: Grade ${gradeLevel} reading level, ${genre},${mood}, ${JSON.stringify(
    nameAndTraits
  )} 
Fairy Tale:`;
}
