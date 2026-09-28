import { getLocales } from 'expo-localization';
const { languageTag } = getLocales()[0];

function formatDate(date: Date) {
    const dateFormatter = new Intl.DateTimeFormat(languageTag, {
        weekday: 'short',    // "seg.", "Mon"
        day: '2-digit',      // "29"
        month: 'long',       // "outubro"
        year: 'numeric',     // "2025"
    });
    return dateFormatter.format( date );

    // return new Intl.DateTimeFormat(languageTag, {
    //     day: '2-digit',
    //     month: 'short',
    //     year: 'numeric',
    // }).format(date);
}

function formatTime(date: Date) {
    return new Intl.DateTimeFormat(languageTag, {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

function formatMoney(value: number, currency: string) {
    return new Intl.NumberFormat(languageTag, {
        style: 'currency',
        currency,
    }).format(value);
}

function formatNumber(value: number) {
    return new Intl.NumberFormat(languageTag, {
        maximumFractionDigits: 2,
    }).format(value);
}

function formatMaps(value: number) {
    // Localização da FIAP Paulista  -23.56397610259296, -46.65240796093317
    const numberFormatter = new Intl.NumberFormat(languageTag, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 14
    });
    return numberFormatter.format( value );
}

function parseDateBR(textoData: string): Date {
    // Divide a string "28/09/2026" em ["28", "09", "2026"]
    const [dia, mes, ano] = textoData.split('/').map(Number);
  
    // Atenção: No JavaScript, os meses começam em 0 (Janeiro = 0, Setembro = 8)
    return new Date(ano, mes - 1, dia);
}

function parseDateUS(textoData: string): Date {
    // Divide a string "28/09/2026" em ["28", "09", "2026"]
    const [mes, dia, ano] = textoData.split('/').map(Number);
  
    // Atenção: No JavaScript, os meses começam em 0 (Janeiro = 0, Setembro = 8)
    return new Date(ano, mes - 1, dia);
}

function parseLocaleNumber(stringNumero: string, locale: string = 'pt-BR'): number {
    // 1. Descobre os separadores do locale (ex: para pt-BR, decimal é ',' e milhar é '.')
    const parts = new Intl.NumberFormat(locale).formatToParts(1111.1);
    const SeparadorMilhar = parts.find(part => part.type === 'group')?.value || '';
    const SeparadorDecimal = parts.find(part => part.type === 'decimal')?.value || '.';
    // 2. Limpa a string baseada nos separadores encontrados
    const numeroLimpo = stringNumero
    .replace(new RegExp(`\\${SeparadorMilhar}`, 'g'), '') // Remove pontos de milhar
    .replace(new RegExp(`\\${SeparadorDecimal}`), '.');   // Substitui a vírgula decimal por ponto
    const numero = parseFloat(numeroLimpo);
    return numero;
}

export {parseDateBR, parseDateUS, parseLocaleNumber, 
    formatDate, formatMaps, formatTime, formatNumber,
    formatMoney, languageTag}

