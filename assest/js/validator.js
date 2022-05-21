function Validator(selector) {
    console.log(selector);
    var formRules = {}
    var validateRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này!'
        },
        email: function (value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Trường này phải là email!'
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? `Vui lòng nhập ít nhất ${min} ký tự!` : undefined
            }
        },
        max: function (max) {
            return function (value) {
                return value.length >= max ? `Vui lòng nhập tối đa ${max} ký tự!` : undefined
            }
        }
    }

    // get form element 
    var formElement = document.querySelector(selector)

    if (formElement) {
        // get list input of formElement
        var inputs = formElement.querySelectorAll('input[name]')

        formRules = Array.from(inputs).reduce((values, input) => {
            let rules = input.getAttribute('rules').split('|')
            for (let rule of rules) {
                let isRuleHasValue = rule.includes(':')
                var ruleInfo
                if (isRuleHasValue) {
                    ruleInfo = rule.split(':')
                    rule = ruleInfo[0]
                }

                var ruleFnc = validateRules[rule]
                if (isRuleHasValue) {
                    ruleFnc = validateRules[rule](ruleInfo[1])
                }

                if (Array.isArray(values[input.name])) {
                    values[input.name].push(ruleFnc)
                } else {
                    values[input.name] = [ruleFnc]
                }
            }
            return values
        }, {})

        console.log(formRules);
    }

}