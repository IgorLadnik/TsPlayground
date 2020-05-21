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

//function func (): number { return this.a; }


//---------------------------------
const fn = (a1: number) => (b: number) => a1 + b;

//---------------------------------


(async function main() {
    const resab = fn(5)(4);

    const obj: any = { a: 1, b: 2, c: 11 };

    //-----------------------------------------------------------------------
    let sum = 0;
    Object.keys(obj).forEach((prop: string) => sum += obj[prop]);

    //-----------------------------------------------------------------------
    const initValue = 5;
    const result = Object.keys(obj).reduce<number>((accumulator: number, current: string) => accumulator + obj[current], initValue); // result = 19
    console.log(result);

    //-----------------------------------------------------------------------
    const field1 = new Field('1', 'val1',
            [new Field('1.1', 'val1.1'),
            new Field('1.2', 'val1.2')]);
    const field2 = new Field('2', 'val2',
            [new Field('2.1', 'val2.1'),
            new Field('2.2', 'val2.2')]);

    const schema: any = { field1, field2 };

    //reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

    const newSchema = Object.keys(schema).reduce<Field>((accumulator: Field, currentProp: string) => {
        accumulator.children.push(schema[currentProp]);
        return accumulator;
    }, new Field('20', 'val20'));

    console.log(JSON.stringify(newSchema));

    //-----------------------------------------------------------------------
    // const my = new MyClass(5);
    // const a = func.bind(my)();

    // console.log(a);
})();
