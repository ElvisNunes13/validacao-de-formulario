class ValidaCpf {
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo',{
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    éSequência(){
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCpf(){
        const cpfSemDigios = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCpf.geraDigito(cpfSemDigios);
        const digito2 = ValidaCpf.geraDigito(cpfSemDigios+digito1);
        this.novoCpf =  cpfSemDigios + digito1 + digito2;
    }

    static geraDigito(cpfSemDigios){
        let total = 0;
        let reverso = cpfSemDigios.length + 1;
        for(let stringNumerica of cpfSemDigios){
            total += reverso * Number(stringNumerica);
            reverso --;
        }
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    valida(){
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.éSequência()) return false;
        this.geraNovoCpf();

        return this.novoCpf === this.cpfLimpo
    }
}