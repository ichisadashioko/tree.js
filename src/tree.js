// Get variable name by object
// usage obj_name({x})
const obj_name = obj => Object.keys(obj)[0];

const NotAModuleTypes = [
    'number',
    'string',
    'undefined',
]

const IsModule = (module) => {
    let module_type = typeof module;
    if (NotAModuleTypes.includes(module_type) || module === null || Array.isArray(module)) {
        return false;
    }

    try {
        return Object.keys(module).length !== 0;
    } catch (error) {
        return false;
    }
}

const GetProps = (module) => Object.keys(module);


const walk = (module, prefix, counts) => {
    const props = GetProps(module);
    props.forEach((prop_name, index) => {
        const isModule = IsModule(module[prop_name]);
        counts[isModule ? 'modules' : 'props'] += 1;

        if (index == props.length - 1) {
            console.log(`${prefix}└── ${prop_name}`);
            if (isModule) {
                walk(module[prop_name], `${prefix}    `, counts);
            }
        } else {
            console.log(`${prefix}├── ${prop_name}`);
            if (isModule) {
                walk(module[prop_name], `${prefix}|   `, counts);
            }
        }
    })
}

const counts = { modules: 0, props: 0 };

walk(enchant, '', counts)