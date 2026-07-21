# Segurança e riscos conhecidos

## Dependências

Em 2026-07-16, `npm audit --omit=dev` aponta um alerta moderado indireto no PostCSS empacotado pelo Next.js 16.2.10. O pacote afetado é usado na compilação de CSS; a aplicação não recebe CSS fornecido por usuários. A correção sugerida pelo npm rebaixaria o Next para 9.3.3 e não é aceitável. Manter monitorado até um release estável do Next atualizar o PostCSS interno.

Não há vulnerabilidades altas ou críticas conhecidas no lockfile atual.

## Antes da produção

- Configurar secrets somente no provedor de deploy.
- Ativar rate limiting persistente no proxy/API.
- Validar webhooks de pagamento por assinatura e idempotência.
- Usar URLs assinadas para upload de arte e antivírus no armazenamento.
- Definir retenção LGPD e rotina de exclusão/exportação de dados.
- Habilitar backups, logs de auditoria e alertas.
- Executar pentest do checkout e painel administrativo.

