let _isLoggedIn = false;

export function getTicketTypes() {
  return [{key: 'breakfast', title: 'Breakfast'}, {key: 'lunch', title: 'Lunch'}, {key: 'dinner', title: 'Dinner'}, {key: 'drink', title: 'Drink'}];
}

export function getTicketValuesFor(ticketType: string) {
  switch (ticketType) {
    case 'Breakfast':
      return ['eggs', 'hotdog'];
    case 'Lunch':
      return ['meal', 'vegetable'];
    case 'Dinner':
      return ['cake', 'meal'];
    case 'Drink':
      return ['beer', 'water'];
    default:
      return [];
  }
}

export function getListOfTickets() {
  return [
    {
        title: 'Karel Novak',
        description: 'TICKET ID 0001'
    },
    {
        title: 'Pavel Mrazek',
        description: 'TICKET ID 0002'
    },
    {
        title: 'Filip Kadlcak',
        description: 'TICKET ID 0003'
    }
  ]
}

export function isLoggedIn() {
  return _isLoggedIn;
}

export function validateEntryCode(code: string) {
  if(code == '')
    _isLoggedIn = true;
  else
    _isLoggedIn = false;

  return isLoggedIn();
}
