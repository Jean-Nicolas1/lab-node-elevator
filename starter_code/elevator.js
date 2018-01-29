class Elevator {
  constructor() {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.requests = [];
    this.direction = "";
    this.waitingList = [];
    this.passengers = [];
  }

  start() {
    this.startId = setInterval(() => {
      this.update();
    }, 1000);
  }
  stop() {
    clearInterval(this.startId);
  }
  update() {
    // if (this.passengers.length === 0 && this.requests.lenth !== 0) {
    //   if (this.floor < this.requests[this.requests.length - 1]) {
    //     this.direction = "up";
    //     while (this.floor < this.requests[this.requests.length - 1]) {
    //       this.floorUp();
    //     }
    //   } else if (this.floor > this.requests[this.requests.length - 1]) {
    //     while (this.floor > this.requests[this.requests.length - 1]) {
    //       this.floorDown();
    //     }
    //   }
    // }
    for (let i = 0; i < this.MAXFLOOR; i++) {
      this.direction = "up";
      this.floorUp();
      console.log(this.log());
      this._passengersLeave();
      this._passengersEnter();
    }
    for (let i = this.MAXFLOOR; i > 0; i--) {
      this.direction = "down";
      this.floorDown();
      console.log(this.log());
      this._passengersLeave();
      this._passengersEnter();
    }
  }
  _passengersEnter() {
    let filteredList = this.waitingList.filter(person => person.originFloor === this.floor);
    filteredList.forEach(person => {
      console.log(`${person.name} has enter the elevator`);
      this.passengers.push(person);
      this.requests.push(person.destinationFloor);
    });
    this.waitingList = this.waitingList.filter(person => person.originFloor !== this.floor);

    // this.waitingList.forEach(person => {
    //   if (person.originFloor === this.floor) {
    //     this.passengers.push(person);
    //     this.waitingList.splice(this.waitingList.indexOf(person), 1);
    //     this.requests.push(person.destinationFloor);
    //     console.log(person.name + " has enter the elevator");
    //   }
    // });
  }
  _passengersLeave() {
    let filteredList = this.passengers.filter(person => person.destinationFloor === this.floor);

    filteredList.forEach(element => {
      console.log(`${element.name} has left the elevator`);
    });

    this.passengers = this.passengers.filter(person => person.destinationFloor !== this.floor);
    // this.passengers.filter(person => {
    //   if (person.destinationFloor === this.floor) {
    //     this.passengers.splice(this.passengers.indexOf(person), 1);
    //     console.log(person.name + " has left the elevator");
    //   }
    // });
  }
  floorUp() {
    this.floor = Math.min(this.floor + 1, this.MAXFLOOR);
  }
  floorDown() {
    this.floor = Math.max(this.floor - 1, 0);
  }
  call(person) {
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
    console.log("Someone called the elevator");
  }
  log() {
    return `Direction: ${this.direction} | Floor: ${this.floor}`;
  }
}

module.exports = Elevator;
