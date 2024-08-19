
export function getPlanName(plan_id) {
    if (plan_id==1){
     return 'Basic'
    }
    else if (plan_id ==2){
     return 'Advanced'
    }
    else{
     return ''
    }
 }

export function activatePlan(activate_plan_hook,plan_id,user_name) {
    let body = {
        user_name: user_name,
        plan_id: plan_id
    }
    activate_plan_hook.mutate(body)
}
 