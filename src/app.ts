class Field {
    children: Array<Field>;

    constructor(public id: string, public value: string, children: Array<Field> = []) {
        this.children = children;
    }
}

class MyClass {
    constructor(private a: number) { }

    getA = (): number =>
        this.a;
}

// bind -----------------------------------------
function func (): number { return this.a; }


//- 1 --------------------------------------------
const fn = (a1: number) => (b: number) => a1 + b;

//------------------------------------------------
class Ga {
    method1() {
        console.log('method1()');
        this.method2();
    }

    private method2() {
        console.log('method2()');
    }
}

//- 2 ------------------------------------------------------
const afn1 = async (n: number) => console.log(`  afn1: ${n}`);
const afn2 = (n: number) => new Promise<void>(resolve => setImmediate(() => {
    resolve();
    console.log(`  afn2: ${n}`)
}));

// - decorator -------------------------------------------
function log(logMessage: string) {
    // return decorator function
    return function (target: any, property: any, descriptor: any) {
        // save original value, which is method (function)
        let originalMethod = descriptor.value;
        // replace method implementation
        descriptor.value = function(...args: Array<any>) {
            console.log('[LOG]', logMessage);
            // here, call original method
            // `this` points to the instance
            return originalMethod.call(this, ...args);
        };
        return descriptor;
    }
}

class SomeClass {
    @log('the log message')
    method(s: string) {
        console.log(s);
    }
}

//------------------------------------------------
(async function main() {
    // - decorator -------------------------------------------
    const sc = new SomeClass();
    sc.method('a string');

    // - descriptor -------------------------------------------
    let myObj = {
        myPropOne: 1,
        myPropTwo: 2
    };

    let descriptor = Object.getOwnPropertyDescriptor(myObj,'myPropOne');
    console.log(descriptor);

    //- 2 ------------------------------------------------------
    const promises = new Array<Promise<void>>();
    for (let i = 0;  i < 3; i++) {
        promises.push(afn2(i));
        console.log(`loop: ${i}`);
    }

    await Promise.all(promises);
    console.log('all');

    //- 1 --------------------------------------------
    const resab = fn(5)(4);

    //-------------------------------------------------
    const obj: any = { a: 1, b: 2, c: 11 };

    let sum = 0;
    Object.keys(obj).forEach((prop: string) => sum += obj[prop]);

    const initValue = 5;
    const result = Object.keys(obj).reduce<number>((accumulator: number, current: string) =>
        accumulator + obj[current], initValue); // result = 19
    console.log(result);

    //-----------------------------------------------------------------------
    const field1 = new Field('1', 'val1',[new Field('1.1', 'val1.1'),
            new Field('1.2', 'val1.2')]);
    const field2 = new Field('2', 'val2',[new Field('2.1', 'val2.1'),
            new Field('2.2', 'val2.2')]);

    const schema: any = { field1, field2 };

    //reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

    try {
        const newSchema = Object.keys(schema).reduce<Field>((accumulator: Field, currentProp: string) => {
            accumulator.children.push(schema[currentProp]);
            return accumulator;
        }, new Field('10', 'val10'));

        console.log(JSON.stringify(newSchema));
    }
    catch (err) {
        console.log(err);
    }

    //- bind ----------------------------------------------------------------------
    const my = new MyClass(5);
    const a = func.bind(my)();

    console.log(a);

    //------------------------------------------------------------------------------
     const ga = new Ga();
     setImmediate(() => {
         ga.method1();
     });
})();
