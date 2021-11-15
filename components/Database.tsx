let _isLoggedIn = false;
let _isAdmin = false;
let _allTickets = [];
let _allTicketsTypes = [];

function fetchAllTickets() {
    fetch('https://sjezd-qr-ticket.herokuapp.com/get/all_tickets')
      .then((res) => res.json())
      .then((data) => {
        _allTickets = data.message;
      })
      .catch(function (error) {
        _allTickets = [];
        alert('Connection to database error: ' + error);
      });
}

function fetchAllTicketsTypes() {
    fetch('https://sjezd-qr-ticket.herokuapp.com/get/all_interests') // TODO
      .then((res) => res.json())
      .then((data) => {
        _allTicketsTypes = data.message;
      })
      .catch(function (error) {
        _allTicketsTypes = [];
        alert('Connection to database error: ' + error);
      });
}

export function getTicketTypes() {
  if(_allTicketsTypes.length == 0) {
    fetchAllTicketsTypes();
  }

  // TODO filter from database
  _allTicketsTypes = [
    { key: 'registration', title: 'Registration'}, 
    { key: 'dinner_fri', title: 'Dinner friday' },
    { key: 'breakfast_sat', title: 'Breakfast saturday' },
    { key: 'lunch_sat', title: 'Lunch saturday' },
    { key: 'dinner_sat', title: 'Dinner saturday' },
    { key: 'breakfast_sun', title: 'Breakfast sunday' },
    { key: 'snack_sun', title: 'Snack sunday' }
  ];

  return _allTicketsTypes;
}

export function getTicketValuesFor(ticketTypeKey: string) {
  // TODO from database
  switch (ticketTypeKey) {
    case 'breakfast_sat':
      return ['eggs', 'hotdog'];
    case 'lunch_sat':
      return ['meal', 'vegetable'];
    case 'dinner_sat':
      return ['cake', 'meal'];
    case 'snack_sun':
      return ['beer', 'water'];
    default:
      return [];
  }
}

export function getListOfTickets() {
  if(_allTickets.length == 0) {
    fetchAllTickets();
  }

  return _allTickets;
}

export function isLoggedIn() {
  return _isLoggedIn;
}

export function isAdmin() {
  return _isAdmin;
}

export function validateEntryCode(code: string) {
  const adminCode = '1234'; // FIXME admin code from database

  if(code == '' || code == adminCode) { 
    _isLoggedIn = true;
    _isAdmin = false;
    if(code == adminCode) {
      _isAdmin = true;
    }
  } else {
    _isAdmin = false;
    _isLoggedIn = false;
  }

  return isLoggedIn();
}
