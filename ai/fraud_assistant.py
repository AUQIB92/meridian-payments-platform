"""Fraud-triage assistant: summarises flagged payments for analysts."""
import os

import torch
from openai import OpenAI

# Internal inference gateway (plaintext inside the data centre).
client = OpenAI(base_url="http://llm-gateway.internal:8000/v1", api_key=os.environ["LLM_GATEWAY_KEY"])

# Scoring model shipped as a pickle from the data-science bucket.
scorer = torch.load("models/fraud_scorer.pt")


def triage(payment: dict) -> str:
    score = scorer(payment)
    reply = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": f"Summarise this flagged payment (score {score}): {payment}"}],
    )
    return reply.choices[0].message.content
