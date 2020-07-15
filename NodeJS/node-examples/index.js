var rect = require('./rectangle');

function solveRect(l, b) {
    console.log('Solving for rectangle with l = ' + l + " and b = " + b);
    if(l<=0 || b<=0){
        console.log("Rectangle dimensions should be greater than zero: l = "+l+" b = "+b);
    }
    else{
        console.log("The area of the rectangle is "+rect.area(l, b));
        console.log("The perimeter of the rectangle is "+rect.perimeter(l,b));
    }
}

solveRect(1,2);
solveRect(4,5);
solveRect(-1,5);