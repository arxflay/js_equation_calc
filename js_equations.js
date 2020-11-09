function calcEquation(a,b,c)
{
    let out_data = {xa : a, xb : b, xc : c, type: "None", result : {}};
    if (!(!isNaN(a) && !isNaN(b) && !isNaN(c)))
    {
        console.error("Input shoud contain only numbers");
        return 1;
    }
    if (a !== 0) out_data.type = "Quadric";
    else if ((b + c) != 0 && a > 0) out_data.type = "Linear";
    else if ((b + c) !== 0) out_data.type = "Infinite";
    else out_data.type = "Trivial";
    switch (out_data.type)
    {
        case "Quadric":
            discr = Math.pow(b, 2) - 4 * a * c;
            if (discr > 0)
            {
                let multiplied_a = (2 * a);
                let discr_sqrt = Math.sqrt(discr);
                out_data.result.x1 = (-b + discr_sqrt) / multiplied_a;
                out_data.result.x2 = (-b - discr_sqrt) / multiplied_a;
            }
            else if (discr == 0) out_data.result.x = (-b) / (2 * a);
            else
            {
                console.warn("Output values are complex numbers");
                out_data.type = "Complex Quadric"
                let multiplied_a = (2 * a);
                let discr_sqrt = Math.sqrt(-discr);
                out_data.result.x1 = (-b / multiplied_a) + " + i*" + (discr_sqrt / multiplied_a);
                out_data.result.x2 = (-b / multiplied_a) + " - i*" + (discr_sqrt / multiplied_a);
            }
            break;
        case "Linear":
            out_data.result.x = (-b - c) / a; // ax + b + c = 0, ax = -b - c
            break;
        case "Infinite":
            out_data.result.x = "Infinite amount of solutions";
            break;
        case "Trivial":
            out_data.result.x = 0;
            break;
    }
    return out_data;
}
function calcEquations(equations) //each equation shoud be in format {xa:value, xb:value, xc:value}
{
    let out_data = [];
    if (equations == undefined)
    { 
        console.error("equations are undefined");
        return 1;
    }
    else if (!Array.isArray(equations))
    {
        console.error("Input shoud be an array");
        return 1;
    }
    else if (equations.length >= 20)
    {
        console.error("You can't calculate more than 20 equations");
        return 1;
    }
    for (let i = 0; i < equations.length; i++)
    {
        if (Object.keys(equations[i]).length > 3) //argument amount check
        {
            console.error("Equation had too many arguments");
            return 1;
        }
        let rc = calcEquation(equations[i].xa, equations[i].xb, equations[i].xc);
        if (rc == 1)
        {
            console.error("Error occured while function calcEquation was called");
            return 1;
        }
        out_data[i] = rc;
    }
    return out_data;
}

function tests()
{
    console.log("calcEquations test:");
    console.log(calcEquations([{xa:0, xb:0, xc:0}, {xa:0, xb:"100", xc:0}, {xa:2, xb:3, xc:1}, {xa:4, xb:3, xc:1} ])); //valid
    console.log(calcEquations([{}])); //error
    console.log(calcEquations(undefined)); //error
    console.log(calcEquation({xa:0, xb:0, xc:0, xv:10})); //error
    console.log("calcEquation test:\n");
    console.log(calcEquation(0, "100", 0)); //valid
    console.log(calcEquation(undefined, "100", 0)); //error
    console.log(calcEquation(undefined, undefined, undefined)); //error
}
