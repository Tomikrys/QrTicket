let _isLoggedIn = false;

export function getTicketTypes() {
  return [
    { key: 'registration', title: 'Registrace'}, 
    { key: "dinner_fri", title: "Večeře pátek" },
    { key: "breakfast_sat", title: "Snídaně sobota" },
    { key: "lunch_sat", title: "Oběd sobota" },
    { key: "dinner_sat", title: "Večeře sobota" },
    { key: "breakfast_sun", title: "Snídaně neděle" },
    { key: "snack_sun", title: "Balíček na cestu" }
  ];
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
