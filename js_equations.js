let serverLimit = 0;

function calcEquation(a,b,c)
{
    let out_data = {};
    if (!(!isNaN(a) && !isNaN(b) && !isNaN(c)))
    {
        console.error("Input should contain only numbers");
        return 1;
    }
    if (a !== 0) out_data = {ax2 : a, bx : b, c : c, type : "Quadric", result: {}};
    else if (b != 0) out_data = {bx : b, c : c, type : "Linear", result: {}};
    else if (c != 0) out_data = {ax2 : a, bx : b, c : c, type : "Nonsense", result: {}};
    else out_data = {c : c, type : "Trivial", result: {}};
    switch (out_data.type)
    {
        case "Quadric":
            let discr = Math.pow(b, 2) - 4 * a * c;
            let is_B_EqualsZero = b == 0;
            if (discr > 0)
            {
                let multiplied_a = (2 * a);
                let discr_sqrt = Math.sqrt(discr);
                out_data.result.x1 = (-b + discr_sqrt) / multiplied_a;
                out_data.result.x2 = (-b - discr_sqrt) / multiplied_a;
            }
            else if (discr == 0) out_data.result.x = (is_B_EqualsZero) ? 0 : (-b) / (2 * a);
            else
            {
                console.warn("Output values are complex numbers");
                out_data.type = "Complex Quadric";
                let multiplied_a = (2 * a);
                let discr_sqrt = Math.sqrt(-discr);
                if (!is_B_EqualsZero)
                {
                    out_data.result.x1 = (-b / multiplied_a) + " + i*" + (discr_sqrt / multiplied_a);
                    out_data.result.x2 = (-b / multiplied_a) + " - i*" + (discr_sqrt / multiplied_a);
                }
                else
                {
                    out_data.result.x1 = "i*" + (discr_sqrt / multiplied_a);
                    out_data.result.x2 = "-i*" + (discr_sqrt / multiplied_a);
                }
            }
            break;
        case "Linear":
            out_data.result.x = (c == 0) ? 0 : -c / b //  bx + c = 0, b = - c
            break;
        case "Nonsense":
            out_data.result.x = "Nonsense";
            break;
        case "Trivial":
            out_data.result.x = c;
            break;
    }
    return out_data;
}

function calcEquations(equations) //each equation should be in format {ax2:value, bx:value, c:value}
{
    let out_data = [];
    if (equations == undefined)
    { 
        console.error("equations are undefined");
        return 1;
    }
    else if (!Array.isArray(equations))
    {
        console.error("Input should be an array");
        return 1;
    }
    else if (equations.length >= serverLimit && serverLimit != 0)
    {
        console.error("You can't calculate more than " + serverLimit + " equations");
        return 1;
    }
    for (let i = 0; i < equations.length; i++)
    {
        if (Object.keys(equations[i]).length > 3) //argument amount check
        {
            console.error("Equation had too many arguments");
            return 1;
        }
        let rc = calcEquation(equations[i].ax2, equations[i].bx, equations[i].c);
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
    serverLimit = 10;
    console.log("calcEquations test:");
    console.log(calcEquations([{ax2:0, bx:0, c:0}, {ax2:0, bx:"100", c:0}, {ax2:2, bx:3, c:1}, {ax2:4, bx:3, c:1} ])); //valid
    console.log(calcEquations([{}])); //error
    console.log(calcEquations(undefined)); //error
    console.log(calcEquations([{ax2:0, bx:0, c:0, v:10}])); //error
    console.log("calcEquation test:\n");
    console.log(calcEquation(0, "100", 0)); //valid
    console.log(calcEquation(0, 50, 100)); //valid
    console.log(calcEquation(2, 0, 2)); //valid
    console.log(calcEquation(undefined, "100", 0)); //error
    console.log(calcEquation(undefined, undefined, undefined)); //error
}

tests();
