import { Resend } from 'resend'
import { CitationReportTemplate, AlertTemplate, type CitationReportData, type AlertData } from './templates'
import React from 'react'
import { renderToString } from 'react-dom/server'

export class EmailService {
  private resend: Resend

  constructor() {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('Resend API key not found')
    }
    this.resend = new Resend(apiKey)
  }

  async sendCitationReport(
    to: string | string[],
    data: CitationReportData
  ) {
    try {
      const html = renderToString(React.createElement(CitationReportTemplate, { data }))

      const { data: result, error } = await this.resend.emails.send({
        from: 'kreativpique <reports@kreativpique.com>',
        to: Array.isArray(to) ? to : [to],
        subject: `AI Citation Report: ${data.clientName} - ${data.reportPeriod}`,
        html: html,
        headers: {
          'X-Entity-Ref-ID': `report-${data.clientName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
        },
        tags: [
          { name: 'type', value: 'citation-report' },
          { name: 'client', value: data.clientName },
          { name: 'agency', value: data.agencyName }
        ]
      })

      if (error) {
        throw new Error(`Failed to send email: ${error.message}`)
      }

      return result
    } catch (error) {
      console.error('Error sending citation report:', error)
      throw error
    }
  }

  async sendAlert(
    to: string | string[],
    data: AlertData
  ) {
    try {
      const html = renderToString(React.createElement(AlertTemplate, { data }))

      const getSubject = () => {
        switch (data.alertType) {
          case 'high_value_citation':
            return `🎉 High-Value Citation: ${data.clientName} on ${data.platform}`
          case 'negative_sentiment':
            return `⚠️ Negative Sentiment Alert: ${data.clientName}`
          case 'new_platform':
            return `🆕 New Platform Citation: ${data.clientName} on ${data.platform}`
          default:
            return `Citation Alert: ${data.clientName}`
        }
      }

      const { data: result, error } = await this.resend.emails.send({
        from: 'kreativpique <alerts@kreativpique.com>',
        to: Array.isArray(to) ? to : [to],
        subject: getSubject(),
        html: html,
        headers: {
          'X-Entity-Ref-ID': `alert-${data.alertType}-${Date.now()}`
        },
        tags: [
          { name: 'type', value: 'alert' },
          { name: 'alert-type', value: data.alertType },
          { name: 'client', value: data.clientName },
          { name: 'platform', value: data.platform }
        ]
      })

      if (error) {
        throw new Error(`Failed to send alert: ${error.message}`)
      }

      return result
    } catch (error) {
      console.error('Error sending alert:', error)
      throw error
    }
  }

  async sendWelcomeEmail(
    to: string,
    agencyName: string,
    ownerName: string
  ) {
    try {
      const { data: result, error } = await this.resend.emails.send({
        from: 'kreativpique <welcome@kreativpique.com>',
        to: [to],
        subject: `Welcome to kreativpique, ${agencyName}!`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #0f1419; font-size: 32px; margin-bottom: 8px;">
                kreativ<span style="color: #10b981;">pique</span>
              </h1>
              <p style="color: #64748b; font-size: 18px;">AI Search Optimization Platform</p>
            </div>

            <h2 style="color: #1f2937;">Welcome, ${ownerName}!</h2>

            <p style="color: #374151; line-height: 1.6;">
              Thank you for joining kreativpique! We're excited to help ${agencyName}
              optimize your clients' presence across AI search platforms.
            </p>

            <div style="background: #f8fafc; padding: 24px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #1f2937; margin-top: 0;">🚀 Getting Started</h3>
              <ol style="color: #374151; line-height: 1.6;">
                <li>Add your first client</li>
                <li>Set up monitoring queries</li>
                <li>Configure AI platform API keys</li>
                <li>Start tracking citations!</li>
              </ol>
            </div>

            <div style="text-align: center; margin: 40px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://app.kreativpique.com'}/dashboard"
                 style="background: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                Get Started
              </a>
            </div>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; text-align: center;">
              <p>Need help? Reply to this email or visit our <a href="#" style="color: #10b981;">help center</a>.</p>
              <p style="margin-top: 16px;">© 2025 kreativpique. All rights reserved.</p>
            </div>
          </div>
        `,
        tags: [
          { name: 'type', value: 'welcome' },
          { name: 'agency', value: agencyName }
        ]
      })

      if (error) {
        throw new Error(`Failed to send welcome email: ${error.message}`)
      }

      return result
    } catch (error) {
      console.error('Error sending welcome email:', error)
      throw error
    }
  }

  async sendTeamInvitation(
    to: string,
    inviterName: string,
    agencyName: string,
    role: string,
    invitationUrl: string
  ) {
    try {
      const { data: result, error } = await this.resend.emails.send({
        from: 'kreativpique <invitations@kreativpique.com>',
        to: [to],
        subject: `You're invited to join ${agencyName} on kreativpique`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #0f1419; font-size: 32px; margin-bottom: 8px;">
                kreativ<span style="color: #10b981;">pique</span>
              </h1>
              <p style="color: #64748b; font-size: 18px;">AI Search Optimization Platform</p>
            </div>

            <h2 style="color: #1f2937;">You're Invited!</h2>

            <p style="color: #374151; line-height: 1.6;">
              ${inviterName} has invited you to join <strong>${agencyName}</strong> on kreativpique
              as a <strong>${role}</strong>.
            </p>

            <div style="background: #f8fafc; padding: 24px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #1f2937; margin-top: 0;">About kreativpique</h3>
              <p style="color: #374151; margin: 0; line-height: 1.6;">
                Monitor and optimize your clients' presence across AI search platforms like
                ChatGPT, Claude, Perplexity, and Gemini. Track citations, analyze sentiment,
                and improve AI search performance.
              </p>
            </div>

            <div style="text-align: center; margin: 40px 0;">
              <a href="${invitationUrl}"
                 style="background: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                Accept Invitation
              </a>
            </div>

            <p style="color: #64748b; font-size: 14px; text-align: center;">
              This invitation will expire in 7 days.
            </p>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; text-align: center;">
              <p>© 2025 kreativpique. All rights reserved.</p>
            </div>
          </div>
        `,
        tags: [
          { name: 'type', value: 'invitation' },
          { name: 'agency', value: agencyName },
          { name: 'role', value: role }
        ]
      })

      if (error) {
        throw new Error(`Failed to send invitation: ${error.message}`)
      }

      return result
    } catch (error) {
      console.error('Error sending invitation:', error)
      throw error
    }
  }

  async sendPasswordReset(
    to: string,
    resetUrl: string
  ) {
    try {
      const { data: result, error } = await this.resend.emails.send({
        from: 'kreativpique <security@kreativpique.com>',
        to: [to],
        subject: 'Reset your kreativpique password',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #0f1419; font-size: 32px; margin-bottom: 8px;">
                kreativ<span style="color: #10b981;">pique</span>
              </h1>
            </div>

            <h2 style="color: #1f2937;">Reset Your Password</h2>

            <p style="color: #374151; line-height: 1.6;">
              We received a request to reset your password for your kreativpique account.
            </p>

            <div style="text-align: center; margin: 40px 0;">
              <a href="${resetUrl}"
                 style="background: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                Reset Password
              </a>
            </div>

            <p style="color: #64748b; font-size: 14px;">
              This link will expire in 1 hour for security reasons. If you didn't request this
              password reset, you can safely ignore this email.
            </p>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; text-align: center;">
              <p>© 2025 kreativpique. All rights reserved.</p>
            </div>
          </div>
        `,
        tags: [
          { name: 'type', value: 'password-reset' }
        ]
      })

      if (error) {
        throw new Error(`Failed to send password reset: ${error.message}`)
      }

      return result
    } catch (error) {
      console.error('Error sending password reset:', error)
      throw error
    }
  }

  async getEmailStats(agencyId: string, days = 30) {
    try {
      // This would typically query your email campaign tracking data
      // For now, we'll return mock data
      return {
        emails_sent: 145,
        open_rate: 68.5,
        click_rate: 12.3,
        bounce_rate: 2.1,
        recent_campaigns: [
          {
            id: '1',
            name: 'Monthly Citation Report',
            sent_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            recipients: 25,
            opens: 18,
            clicks: 4
          },
          {
            id: '2',
            name: 'High-Value Citation Alert',
            sent_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            recipients: 8,
            opens: 7,
            clicks: 3
          }
        ]
      }
    } catch (error) {
      console.error('Error fetching email stats:', error)
      throw error
    }
  }
}

// Export singleton instance
export const emailService = new EmailService()