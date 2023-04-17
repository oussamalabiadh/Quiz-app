/// <reference types="../@types/jquery" />

import { Quiz } from "./quiz.module.js";

export class Setting {
   constructor() {
      // ----------- Start Events
      document.getElementById("start").addEventListener("click", this.startQuestion.bind(this));
   }

   async startQuestion() {
      const category = document.getElementById("category").value;
      const difficulty = document.querySelector('[name="difficulty"]').value;
      const numberOfQ = document.getElementById("amount").value;

      // console.log(category, difficulty, numberOfQ);

      const response = await this.getQuestions(numberOfQ, category, difficulty);

      if (numberOfQ > 0) {
         $("#setting").removeClass("show");
         $("#quiz").addClass("show");
         const quiz = new Quiz(response);
      } else {
         $("#alertNumber").addClass("show");
      }
   }

   async getQuestions(amount, category, difficulty) {
      const apiResponse = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`);
      const response = await apiResponse.json();
      return response.results;
   }
}
