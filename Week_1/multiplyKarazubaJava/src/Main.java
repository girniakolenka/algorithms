import java.math.BigDecimal;

public class Main {
    private static int count = 0;

    public static void main(String[] args) {
        String result = multiplyKarazuba("1685287499328328297814655639278583667919355849391453456921116729", "7114192848577754587969744626558571536728983167954552999895348492");
        System.out.println(result.equals("11989460275519080564894036768322865785999566885539505969749975204962718118914971586072960191064507745920086993438529097266122668"));
    }

    static String multiplyKarazuba(String xStr, String yStr) {
        int n = xStr.length();
        int m = yStr.length();

        if( n != m) {
            int k = Math.abs(m - n);

            if (n > m) {
                yStr = getEqualString(yStr, k);
            } else {
                xStr = getEqualString(xStr, k);
            }
        }

        n = xStr.length();
        BigDecimal x = new BigDecimal(xStr);
        BigDecimal y = new BigDecimal(yStr);

        if (n == 1) {
            return x.multiply(y).toString();
        }

        String a = getFirstSubstring(xStr, n);
        String b = getSecondSubstring(xStr, n);

        String c = getFirstSubstring(yStr, n);
        String d = getSecondSubstring(yStr, n);

        BigDecimal ac = new BigDecimal(multiplyKarazuba(a,c));
        BigDecimal bd = new BigDecimal(multiplyKarazuba(b,d));
        BigDecimal abcd = new BigDecimal(multiplyKarazuba(
                new BigDecimal(a).add(new BigDecimal(b)).toString(),
                new BigDecimal(c).add(new BigDecimal(d)).toString()
        ));

        int n1 = (int) Math.round((double) n / 2.0) * 2;

        BigDecimal n10 = new BigDecimal("10").pow(n1);

        int n2 = (int) Math.round((double) n / 2.0);
        BigDecimal n210 = new BigDecimal("10").pow(n2);

        BigDecimal adbc = abcd.subtract(ac).subtract(bd);

        return n10.multiply(ac).add(bd).add(n210.multiply(adbc)).toString();
    }

    private static String getSecondSubstring(String str, int n) {
        return str.substring(n / 2);
    }

    private static String getFirstSubstring(String str, int n) {
        return str.substring(0, n / 2);
    }

    private static String getEqualString(String xStr, int k ) {
        for (int i = 0; i < k; i++) {
            xStr = "0" + xStr;
        }

        return xStr;
    }
}
