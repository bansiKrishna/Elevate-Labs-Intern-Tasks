package com.example.urlshortener;

import com.example.urlshortener.util.Base62;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class Base62Test {

    @Test
    void encodeDecodeRoundTrip() {
        for (long n : new long[]{0, 1, 61, 62, 12345, 100_000_001L, Long.MAX_VALUE / 2}) {
            assertEquals(n, Base62.decode(Base62.encode(n)));
        }
    }

    @Test
    void knownValues() {
        assertEquals("0", Base62.encode(0));
        assertEquals("z", Base62.encode(35));
        assertEquals("Z", Base62.encode(61));
        assertEquals("10", Base62.encode(62));
    }

    @Test
    void negativeNumberRejected() {
        assertThrows(IllegalArgumentException.class, () -> Base62.encode(-1));
    }
}
