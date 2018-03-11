'use strict';

var _marked = /*#__PURE__*/regeneratorRuntime.mark(read);

function read() {
    var a, b;
    return regeneratorRuntime.wrap(function read$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    console.log(1); //1
                    _context.next = 3;
                    return 'shantong';

                case 3:
                    a = _context.sent;
                    //let a = 代表可以接入新值；
                    console.log(a); //100
                    _context.next = 7;
                    return 9;

                case 7:
                    b = _context.sent;

                    console.log(b); //88
                    return _context.abrupt('return', b);

                case 10:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}