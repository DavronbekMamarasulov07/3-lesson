const form = document.getElementById('form') as HTMLFormElement;
const userName = document.getElementById('name') as HTMLInputElement;
const userAge = document.getElementById('age') as HTMLInputElement;
const userEmail = document.getElementById('email') as HTMLInputElement;
const userAddress = document.getElementById('address') as HTMLInputElement;
const tBody = document.getElementById('table_body') as HTMLTableElement;


interface IUser { 
  id: number;
  name: string;
  age: number;
  email: string;
  address: string;
}

let  usersArray : IUser[] = JSON.parse(localStorage.getItem('users') || '[]');
class User {
  id: number;
  name: string;
  age: number;
  email: string;
  address: string;
  constructor(
    id: number = 0,
    name: string = "",
    age: number = 0,
    email: string = "",
    address: string = ""
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.email = email;
    this.address = address;
  }

  renderUser() {
    tBody.innerHTML = "";
    usersArray.forEach((user) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td class="py-4 px-6 text-gray-800">${user.name}</td>
            <td class="py-4 px-6 text-gray-600">${user.age}</td>
            <td class="py-4 px-6 text-gray-600">${user.email}</td>
            <td class="py-4 px-6 text-gray-600">${user.address}</td>
            <td class="py-4 px-6 text-gray-600">
              <button data-id="${user.id}" class="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300">Delete</button>
            </td>
          `;

      tBody.appendChild(tr);
    });

    
  }

  deleteUser(id: number) {
    const userDelete = confirm("Are you sure you want to delete this user?");
    if(userDelete) {
        usersArray = usersArray.filter((user) => user.id !== id);
        localStorage.setItem("users", JSON.stringify(usersArray));
        this.renderUser();
        console.log(usersArray);
    }
  }
}



tBody.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target && target.tagName === "BUTTON" && target.dataset.id) {
    const userId = parseInt(target.dataset.id, 10);
    new User().deleteUser(userId);
  }
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = Math.floor(Math.random() * 100);
    let name = userName.value;
    let age = +userAge.value;
    let email = userEmail.value;
    let address = userAddress.value;

    const newUser = new User(id,name, age, email, address);
    console.log(newUser)
    usersArray.push(newUser);
    localStorage.setItem('users', JSON.stringify(usersArray));
    newUser.renderUser();
    form.reset();

    
})

 new User().renderUser();
