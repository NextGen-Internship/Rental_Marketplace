package com.devminds.rentify.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.Token;
import com.stripe.model.checkout.Session;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.TokenCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Date;

@Service
public class StripeService {

    private static final String[] HEADERS_TO_TRY = {
            "X-Forwarded-For",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR"};

    public String getClientIpAddress(HttpServletRequest request) {
        for (String header : HEADERS_TO_TRY) {
            String ip = request.getHeader(header);
            if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
                return ip;
            }
        }

        return request.getRemoteAddr();
    }

    public Account createStripeAccount(HttpServletRequest httpServletRequest) throws StripeException {
        Stripe.apiKey = "sk_test_51OcpzgGAUVgXgq0ONlbbyYZe2l1TwIico5pxExqjnI9aJohhRiMZjdUc7VluBEajW85KsyETv6PygE6WdcvTC5jY001uSdQMTU";

        TokenCreateParams tokenParams =
                TokenCreateParams.builder()
                        .setBankAccount(
                                TokenCreateParams.BankAccount.builder()
                                        .setCountry("BG")
                                        .setCurrency("bgn")
                                        .setAccountHolderName("Georgi Georgiev")
                                        .setAccountHolderType(
                                                TokenCreateParams.BankAccount.AccountHolderType.INDIVIDUAL
                                        )
                                        .setAccountNumber("BG80BNBG96611020345678")
                                        .build()
                        )
                        .build();
        Token token = Token.create(tokenParams);

        AccountCreateParams params =
                AccountCreateParams.builder()
                        .setType(AccountCreateParams.Type.CUSTOM)
                        .setCountry("BG")
                        .setEmail("jenny.rosen@example23.com")

                        .setBusinessType(AccountCreateParams.BusinessType.INDIVIDUAL)
                        .setBusinessProfile(AccountCreateParams.BusinessProfile.builder()
                                .setMcc("5931")
                                .setProductDescription("marketplaces").build())
                        .setIndividual(AccountCreateParams.Individual.builder()
                                .setFirstName("Georgi")
                                .setLastName("Georgiev")
                                .setDob(AccountCreateParams.Individual.Dob.builder().setYear(1999L)
                                        .setMonth(9L)
                                        .setDay(9L).build())
                                .setAddress(AccountCreateParams.Individual.Address.builder()
                                        .setCountry("BG")
                                        .setCity("Sofia")
                                        .setLine1("testLine")
                                        .setState("testState")
                                        .setPostalCode("TestPostCode").build())
                                .setEmail("testIndividualEmail@abv.bg")
                                .setPhone("+359885885185")
                                .build())
                        .setTosAcceptance(AccountCreateParams.TosAcceptance.builder()
                                .setIp(getClientIpAddress(httpServletRequest))
                                .setDate(new Date().getTime() / 1000)
                                .build())

                        .setExternalAccount(token.getId())

                        .setCapabilities(
                                AccountCreateParams.Capabilities.builder()
                                        .setCardPayments(
                                                AccountCreateParams.Capabilities.CardPayments.builder()
                                                        .setRequested(true)
                                                        .build()
                                        )
                                        .setTransfers(
                                                AccountCreateParams.Capabilities.Transfers.builder()
                                                        .setRequested(true)
                                                        .build()
                                        )
                                        .build()
                        ).build();

        Account account = Account.create(params);
        account.setPayoutsEnabled(true);
        return account;
    }

    public Session createCheckoutSession() throws StripeException {
        Stripe.apiKey = "sk_test_51OcpzgGAUVgXgq0ONlbbyYZe2l1TwIico5pxExqjnI9aJohhRiMZjdUc7VluBEajW85KsyETv6PygE6WdcvTC5jY001uSdQMTU";

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setPrice("price_1OevcNGAUVgXgq0OqzS1PTkF")
                                        .setQuantity(1L)
                                        .build()
                        )
                        .setPaymentIntentData(
                                SessionCreateParams.PaymentIntentData.builder()
                                        .setApplicationFeeAmount(123L)
                                        .setTransferData(
                                                SessionCreateParams.PaymentIntentData.TransferData.builder()
                                                        .setDestination("acct_1OhpD1QAOyFXfIlp")
                                                        .build()
                                        )
                                        .build()
                        )
                        .setSuccessUrl("https://example.com/success")
                        .setCancelUrl("https://example.com/cancel")
                        .build();

        Session session = Session.create(params);
        System.out.println();
        return Session.create(params);
    }

}
