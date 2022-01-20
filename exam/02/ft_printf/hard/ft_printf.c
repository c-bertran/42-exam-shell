#include <stdarg.h>
#include <unistd.h>
#include <stdlib.h>

typedef struct s_props {
    int width;
    int is_prec;
    int prec;
    int skip;
    char type;
} t_props;

#define WIDTH format->width
#define PREC format->prec
#define IS_PREC format->is_prec
#define SKIP format->skip
#define TYPE format->type
#define MAX(a, b) (a > b ? a : b)
#define MIN(a, b) (a < b ? a : b)

void init_struct(t_props *format) {
    WIDTH = 0;
    PREC = 0;
    IS_PREC = 0;
    SKIP = 0;
    TYPE = 0;
}

int ft_isdigit(char c) {
    return (c >= 48 && c <= 57);
}

void ft_parse(const char *str, t_props *format) {
    int flag = 0, n = 0;
    while (ft_isdigit(str[n]) || str[n] == '.') {
        if (str[n] == '.') {
            flag = 1;
            IS_PREC = 1;
        }
        else if (!flag)
            WIDTH = WIDTH * 10 + str[n] - '0';
        else
            PREC = PREC * 10 + str[n] - '0';
        n++;
    }
    if (str[n] == 'd' || str[n] == 's' || str[n] == 'x') {
        TYPE = str[n++];
    }
    SKIP = n;
}

char *ft_itoa(unsigned int n, int baselen) {
    char *base = "0123456789abcdef";
    unsigned int tmp = n;
    int numlen = 0;
    while (tmp) {
        tmp /= baselen;
        numlen++;
    }
    char *ret = (char *) malloc(numlen + (!n) + 1);
    ret[numlen + (!n)] = '\0';
    if (!n)
        ret[0] = '0';
    while (n) {
        ret[--numlen] = base[n % baselen];
        n /= baselen;
    }
    return (ret);
}

int ft_strlen(char *str) {
    int n = 0;
    while (str[n])
        n++;
    return (n);
}

size_t ft_process_d(t_props *format, int n) {
    size_t ret = 0;
    unsigned int tmp = (n < 0 ? -n : n);
    char *num = ft_itoa(tmp, 10);
    int len = ft_strlen(num);

    if (IS_PREC) {
        if (!PREC && !n) {
            while (WIDTH--)
                ret += write(1, " ", 1);
        } else {
            while (WIDTH-- > MAX(len + (n < 0), PREC + (n < 0)))
                ret += write(1, " ", 1);
            if (n < 0)
                ret += write(1, "-", 1);
            while (PREC-- > len)
                ret += write(1, "0", 1);
            ret += write(1, num, len);
        }
    } else {
        while (WIDTH-- > len + (n < 0))
            ret += write(1, " ", 1);
        if (n < 0)
            ret += write(1, "-", 1);
        ret += write(1, num, len);
    }
    free(num);
    return (ret);
}

size_t ft_process_x(t_props *format, unsigned int n) {
    size_t ret = 0;
    char *num = ft_itoa(n, 16);
    int len = ft_strlen(num);

    if (IS_PREC) {
        if (!PREC && !n) {
            while (WIDTH--)
                ret += write(1, " ", 1);
        } else {
            while (WIDTH-- > MAX(len + (n < 0), PREC))
                ret += write(1, " ", 1);
            if (n < 0)
                ret += write(1, "-", 1);
            while (PREC-- > len)
                ret += write(1, "0", 1);
            ret += write(1, num, len);
        }
    } else {
        while (WIDTH-- > len + (n < 0))
            ret += write(1, " ", 1);
        if (n < 0)
            ret += write(1, "-", 1);
        ret += write(1, num, len);
    }
    free(num);
    return (ret);
}

size_t ft_process_s(t_props *format, char *str) {
    size_t ret = 0;

    if (!str)
        str = "(null)";
    int len = ft_strlen(str);

    if (!IS_PREC) {
        while (WIDTH-- > len)
            ret += write(1, " ", 1);
        ret += write(1, str, len);
    } else {
        while (WIDTH-- > MIN(len, PREC))
            ret += write(1, " ", 1);
        ret += write(1, str, MIN(len, PREC));
    }
    return (ret);
}


size_t ft_processor(t_props *format, va_list ap) {
    size_t ret = 0;

    if (TYPE == 'd')
        ret = ft_process_d(format, va_arg(ap,
    int));
    if (TYPE == 'x')
        ret = ft_process_x(format, va_arg(ap,
    unsigned int));
    if (TYPE == 's')
        ret = ft_process_s(format, va_arg(ap,
    char*));
    return (ret);
}

int ft_printf(const char *str, ...) {
    int ret = 0, n = 0;
    t_props format;
    va_list ap;
    va_start(ap, str);

    while (str[n]) {
        init_struct(&format);
        if (str[n] != '%') {
            ret += write(1, &str[n], 1);
        } else {
            ft_parse(&str[n + 1], &format);
            n += format.skip;
            ret += ft_processor(&format, ap);
        }
        n++;
    }
    va_end(ap);
    return (ret);
}
