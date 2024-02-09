const square = (a: number) => a * a;
const plusOne = (a: number) => a + 1;

function FunctionParenthesisAndParameters() {
    const twoSquared = square(2);
    const threePlusOne = plusOne(3);
    console.log(twoSquared);
    console.log(threePlusOne);

    return (
        <>
            <h3>Parenthes and parameters</h3>
            twoSquared = {twoSquared}
            <br />
            square(2) = {square(2)}
            <br />
            threePlusOne = {threePlusOne}
            <br />
            plusOne(3) = {plusOne(3)}
            <br />
        </>
    );
}
export default FunctionParenthesisAndParameters;