/// <reference types="../@types/jquery" />
export class Quiz {
   constructor(response) {
      //  ----------- Global Elements
      this.response = response;
      this.questionLength = response.length;
      this.curentIndex = 0;
      this.score = 0;
      this.correctAns;
      this.from = document.getElementById("from");
      //  ----------- When Start
      this.showQuestion();
      // ----------- Start Events
      console.log(this.response);
      document.getElementById("to").innerHTML = this.questionLength;
      document.getElementById("nextQuestion").addEventListener("click", this.nextQuestion.bind(this));
      document.getElementById("end").addEventListener("click", this.tryAgain.bind(this));
   }

   showQuestion() {
      this.from.innerHTML = this.curentIndex + 1;
      const curentQuestion = this.response[this.curentIndex]; // {}

      document.getElementById("questionTitle").innerHTML = curentQuestion.question;

      const randomNumber = Math.ceil(Math.random() * this.response.length); // random number to shufle array

      this.correctAns = curentQuestion.correct_answer;
      const answers = [...curentQuestion.incorrect_answers];

      answers.splice(randomNumber, 0, this.correctAns);

      let questions = ``;

      answers.forEach((answer) => {
         questions += `
         
         <li class="my-3 animate__animated">
         <div class="pretty p-default p-round p-smooth p-plain">
            <input type="radio" name="answer" value="${answer}" />
            <div class="state p-success-o">
               <label> ${answer} </label>
            </div>
         </div>
      </li>
         
         `;
      });

      $("#questionContent").html(questions);
   }

   nextQuestion() {
      const curentAns = document.querySelector('[name="answer"]:checked')?.value;

      if (curentAns != null) {
         $("#alertAns").fadeOut(200);

         if (curentAns === this.correctAns) {
            this.score++;
            $("#correct").fadeIn(0);
            setTimeout(() => {
               $("#correct").fadeOut(0);
            }, 500);
         } else {
            $("#inCorrect").fadeIn(0);
            setTimeout(() => {
               $("#inCorrect").fadeOut(0);
            }, 500);
         }

         this.curentIndex++;

         if (this.curentIndex > this.response.length - 1) {
            $("#quiz").removeClass("show");
            $("#finsish").addClass("show");
            $("#score").html(this.score);
         } else {
            this.showQuestion();
         }
      } else {
         $("#alertAns").fadeIn(200);
      }
   }

   tryAgain() {
      $("#finsish").removeClass("show");
      $("#setting").addClass("show");
   }
}
