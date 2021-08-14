export function activeRoom() {
  let lis = document.querySelectorAll(".channels li");

  lis.forEach((li) => {
    li.addEventListener("mousedown", function () {
      lis.forEach((li) => {
        li.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
}
