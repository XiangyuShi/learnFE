export default class jsonParse {
    parse(text) {
        this.text = text.replace(/^[^{]|[^}]$]/g, '');
        this.length = text.length;
        this.index = 0;
        return this.run({});
    }

    run(context) {
        while (this.index < this.length) {
            let ch = this.text.charAt(this.index);
            if (ch === '{') {
                this.build(context);

            } else {
                throw new Error('不是一个Json');
            }
        }
        return context
    }

    build(context) {
        debugger;
        do {
            if (this.peek()==='}') {
                break;
            }
            let key = this.readKey();
            this.ignoreEmpty();
            this.consume(':');
            this.ignoreEmpty();
            context[key] = this.readValue();
        } while (this.expect(','));
        this.ignoreEmpty();
        this.consume('}');
    }

    readValue() {
        this.ignoreEmpty();
        let ch = this.text.charAt(this.index);
        if (ch === '{') {
            return this.run({});
        } else if (ch === '[') {
            return this.readArray([]);
        } else if (ch === '"' || ch === "'") {
            return this.readString();
        } else if (this.isNumber(ch) || ch === '.' && this.isNumber(this.text.charCodeAt(this.index + 1))) {
            return this.readNumber()
        }
        throw new Error('读取Value出错!')

    }

    readArray(context) {
        if (!this.peek(']')) {
            do {
                if (this.peek(']')) {
                    break;
                }
                context.push(this.readValue());
            } while (this.expect(','));
        }
        this.consume(']');
        return context;
    }

    expect(text) {
        let token = this.text.charAt(this.index);
        if (token === text) {
            this.index++;
            return true;
        }
        return false;
    }

    isNumber(ch) {
        return typeof ch === 'string' && ch >= '0' && ch <= '9';
    }

    isExpOperator(text) {
        return text === '+' || text === '-' || this.isNumber(text);
    }

    readNumber() {
        let value = '';
        let appearedDot = false;
        while (this.index < this.text.length) {
            let ch = this.text.charAt(this.index).toLowerCase();
            if (ch === '.') {
                if (!this.isNumber(this.peek())) {
                    throw new Error('解析数字出错！');
                }
                if (appearedDot) {
                    throw new Error('解析数字出错！');
                }
                value += ch;
                appearedDot = true;
            } else if (this.isNumber(ch)) {
                value += ch;
            } else {
                let nextText = this.peek();
                if (ch === 'e' && this.isExpOperator(nextText)) {
                    value += ch;
                } else if (this.isExpOperator(ch) && nextText && this.isNumber(nextText) && value.charAt(value.length - 1) === 'e') {
                    value += ch;
                } else if (this.isExpOperator(ch) && (!nextText || !this.isNumber(nextText)) && value.charAt(value.length - 1) === 'e') {
                    throw new Error('解析数字出错！');
                } else {
                    break;
                }
            }
            this.index++;
        }
        return Number(value);
    }

    readKey() {
        let ch = this.text.charAt(this.index);
        let key = '';
        if (ch !== '"' && ch !== "'") {
            this.index++;
            while (this.index < this.length) {
                let ch = this.text.charAt(this.index);
                if (!this.isEmpty(ch) && ch !== ':') {
                    key += ch;
                    this.index++;
                } else {
                    return key;
                }
            }
        }
        return this.readString();
    }

    ignoreEmpty() {
        while (this.index < this.length) {
            let ch = this.text.charAt(this.index);
            if (this.isEmpty(ch)) {
                this.index++;
            } else {
                break;
            }
        }
    }

    isEmpty(text) {
        return typeof text !== 'string' || text === ' ' || text === '\n' || text === '\r' || text === '\t' || text === '\v' || text === '\u00a0';
    }

    peek() {
        const index = this.index + 1;
        return index < this.length ? this.text.charAt(index) : false;
    }

    consume(ch) {
        if (this.text.charAt(this.index) !== ch) {
            throw new Error('解析出错');
        }
        this.index++;
    }

    readString() {
        let value = '';
        let escape = false;
        let quote = this.peek();
        if (quote == '"' || quote == "'") {
            this.index++;
        }
        this.index++;
        while (this.index < this.length) {
            let ch = this.text.charAt(this.index);
            if (quote != '"' && quote != "'" && this.isEmpty(ch)) {
                return value;
            }
            if (escape) {
                if (ch === 'u') {
                    let hexCode = this.text.substring(this.index + 1, this.index + 5);
                    if (/[\da-f]{4}/i.test(hexCode)) {
                        value += String.fromCharCode(parseInt(hexCode, 16));
                        this.index += 4;
                    } else {
                        throw new Error('转义\\' + hexCode + '失败');
                    }
                } else {
                    this.index--;
                    value += this.ignoreEmpty();
                }
                escape = false;
            } else if (ch == '\\') {
                escape = true;
            } else if (ch == quote && ch == '"' || ch == "'") {
                this.index++;
                return value;
            } else {
                value += ch;
            }
            this.index++;
        }
    }
}