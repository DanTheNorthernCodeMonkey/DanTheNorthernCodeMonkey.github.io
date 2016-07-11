---
layout: post
section-type: post
title: Python AES Encryption to .Net Decryption
category: tech
tags: [ 'python', 'csharp' ]
---

For the sanity of all developers fucking around with this shit.

Python crypto library AES will have no padding, and the IV is optional.

When decrypting I had a nightmare with the RijndaelManaged class for AES. The below worked for me:

{% highlight csharp %}

private string Decrypt(string cipherText)
{
    string EncryptionKey = "randomStringOfShit";
    byte[] cipherBytes = Convert.FromBase64String(cipherText);
    using (Aes encryptor = Aes.Create())
    {
        encryptor.Key = pdb.GetBytes(32);
        encryptor.Padding = Padding.None;
        encryptor.Mode = AES.ECB // Yours will likely be different as this is weak.
        
        using (MemoryStream ms = new MemoryStream())
        {
            using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
            {
                cs.Write(cipherBytes, 0, cipherBytes.Length);
                cs.Close();
            }
            cipherText = Encoding.ASCII.GetString(ms.ToArray());
        }
    }
    return cipherText;
}

{% endhighlight %}