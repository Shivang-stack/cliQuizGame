#!/usr/bin/env node

import chalk from "chalk";
import inquirer from 'inquirer';
import gradient from 'gradient-string'
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";



let playerName;

const sleep = (ms = 2000) => new Promise((r)=>setTimeout(r,ms));

async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow(
        'Hey Welcome !!\n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('To Do List CLI')}
    i am a process on your computer 
    if you get any question wrong i will be ${chalk.bgRed('killed')}
    So get all the questions right...

    `);
}



async function askName(){
    const answer = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: "what is your name?",
        default(){
            return 'player'
        },
    });
    playerName = answer.player_name;
}


async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'javascript was created on\n',
        choices:[
            'May 23rd, 1995',
            'Nov 24th 1995',
            'Dec 4th, 1995',
            'Dec 17, 1996',
        ],
    });
    return handleAnswer(answers.question_1);
}

async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking answer .....').start();
    await sleep();

    if(isCorrect){
        spinner.success({text:`Nice Work ${playerName}. Thats a legit answer`});
    } else {
        spinner.error({text: `Game over, you lose ${playerName}`})
        process.exit(1);
    }
}

function winner(){
    console.clear();
    const msg = `Congrats, ${playerName} !\n Noice Play`;

    figlet(msg, (err, data)=>{
        console.log(gradient.pastel.multiline(data));
    })
}


await welcome() ;
await askName();
await question1();
winner();