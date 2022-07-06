const initialState={
    zeroExperienceItems: [],
    middleExperienceItems: [],
    heightExperienceItems: [],

}



const getZeroExperienceItems= arr=>{
    return arr.reduce((sum,obj)=>obj.price+sum,0);
}
    const _get=(obj, path)=>{
        const [firstKey, ...keys]=path.split('.')
        return keys.reduce((val,key)=>
        {
           return val[key]
        }, obj[firstKey])
    }

const getTotalSum=(obj,path)=>{
    return Object.values(obj).reduce((sum,obj)=>{
        const value= _get(obj, path);
            return sum+value},0,);
}

const vacancy=(state = initialState, action)=>{
    console.log("payload", action.payload)
    if(action.type ==="ADD_ZERO_EXPERIENCE_VACANCY")
    {
        return {
            ...state,
            zeroExperienceItems:getZeroExperienceItems(action.payload),
            // middleExperienceItems:getMiddleExperienceItems(),
            // heightExperienceItems:getHeightExperienceItems()
        };
    }
    // else if(action.type ==="ADD_MIDDLE_EXPERIENCE_VACANCY")
    // {
    //     return {
    //         ...state,
    //         middleExperienceItems:action.payload.items
    //     };
    // }
    // else if(action.type ==="ADD_HEIGHT_EXPERIENCE_VACANCY")
    // {
    //     return {
    //         ...state,
    //         heightExperienceItems:action.payload.items
    //     };
    // }
    return state
}
export default vacancy