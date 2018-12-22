import { Exception } from "handlebars";

/* Часть 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(arg) {
    return arg;
}

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
function defaultParameterValue(a, b) {
    if (typeof b === "number") return a + b;
    return a + 100;
}

/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
function returnArgumentsArray() {
    var argumentArray = Array.from(arguments);
    return argumentArray;
}

/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
function returnFnResult(fn) {
    return fn();
}

/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */
function returnCounter(number = 0) {
    return function F() {
        if (typeof number === "number") return ++number;
        return 1;

    }
}

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */
function bindFunction(fn, ...args) {
    return fn.bind(null, ...args);
}
/* Часть 2 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray[i] = fn(array[i], i, array)
    }
    return newArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {

    var previousElement, iterator = 0;
    if(initial == undefined){
        previousElement = array[0];
        iterator = 1;
    }else previousElement = initial;
    for(var i = iterator; i < array.length; i ++){
        previousElement = fn(previousElement, array[i], i, array);
    }
    return previousElement;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    for(var key in obj){
        if(key === prop) return true;
    }
    return false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    var arr = [];
    for (var key in obj) {
        arr.push(key);
    }
    return arr;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var arr = [];
    for (var key in obj) {
        arr.push(key.toUpperCase());
    }
    return arr;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    // var newArray = new Array;
    // for(var i = from; i != to; i++) newArray.push(array[i]);
    return array.slice(from,to);
}

/* Часть 3 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {

    if(!Array.isArray(array) || array.length == 0) throw new Error("empty array");

    if(typeof fn != "function") throw new Error("fn is not a function");

    for(var i = 0; i < array.length; i++){
        if(!fn(array[i])) return false;
    }
    return true;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {

    if(!Array.isArray(array) || array.length == 0) throw new Error("empty array");

    if(typeof fn != "function") throw new Error("fn is not a function");

    for(var i = 0; i < array.length; i++){
        if(!fn(array[i])) return true;
    }
    return false;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {

    var arrayException = [];
    if(typeof fn != "function") throw new Error("fn is not a function");
    for(var i = 1; i < arguments.length; i++){
        try{
            fn(arguments[i]);
        }
        catch(e){
            arrayException.push(arguments[i]);
        }
    }
    return arrayException;

}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
    if (typeof number != "number") throw new Error("number is not a number");
    var obj = {
        sum: function (){
            for (var i = 0; i < arguments.length; i++) number += arguments[i];
            return number;
        },
        dif: function(){
            for (var i = 0; i < arguments.length; i++) number -= arguments[i];
            return number;
        },
        div: function (){
            for (var i = 0; i < arguments.length; i++) {
                if(arguments[i] == 0) throw new Error("division by 0");
                number /= arguments[i];
            }
            return number;
        },
        mul: function(){
            for (var i = 0; i < arguments.length; i++) number *= arguments[i];
            return number;
        }
    };
    return obj;
}

export {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction,
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
}
