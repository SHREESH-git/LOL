import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Shield, Lightbulb, Star, Award } from "lucide-react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Clinical Psychologist & Founder",
      description: "15+ years experience in mental health therapy and digital wellness solutions.",
      icon: Heart
    },
    {
      name: "Michael Rodriguez",
      role: "Product Designer",
      description: "Specializes in user-centered design for healthcare and wellness applications.",
      icon: Lightbulb
    },
    {
      name: "Emily Johnson",
      role: "Wellness Coach",
      description: "Certified life coach with expertise in mindfulness and stress management.",
      icon: Star
    }
  ];

  const values = [
    {
      title: "Privacy First",
      description: "Your mental health journey is personal. We prioritize your privacy and data security above all else.",
      icon: Shield,
      color: "bg-gradient-primary"
    },
    {
      title: "Community Support",
      description: "Healing happens in connection. We foster a safe, supportive community for everyone.",
      icon: Users,
      color: "bg-gradient-wellness"
    },
    {
      title: "Evidence-Based",
      description: "Our approaches are grounded in clinical research and proven therapeutic methods.",
      icon: Award,
      color: "bg-gradient-calm"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About MindMatters
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Empowering mental wellness through technology, community, and compassionate care
          </p>
          <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
            Est. 2024 • Trusted by 10,000+ users
          </Badge>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At MindMatters, we believe that mental health support should be accessible, 
              personalized, and stigma-free. Our platform combines cutting-edge technology 
              with human-centered design to create tools that truly make a difference in 
              people's lives. We are committed to promoting mental health awareness and 
              providing a safe space where everyone can find the support and resources they need.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value) => (
                <Card key={value.title} className="shadow-card hover:shadow-glow transition-shadow">
                  <CardHeader className="text-center">
                    <div className={`mx-auto w-12 h-12 ${value.color} rounded-full flex items-center justify-center mb-4`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Mental Health Matters Section */}
      <section className="py-16 bg-gradient-wellness/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Mental Health Matters</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Breaking the Stigma</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Mental health is just as important as physical health. By creating open conversations 
                    and providing accessible resources, we help break down barriers and reduce stigma 
                    around mental health challenges.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Support & Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our platform offers comprehensive support through professional guidance, peer connections, 
                    evidence-based tools, and educational resources designed to empower your mental wellness journey.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Safe Space</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We've created a judgment-free environment where you can express yourself freely, 
                    connect with others who understand, and access help without fear or shame.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Awareness & Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Through education and awareness initiatives, we help individuals recognize mental health 
                    signs, understand available treatments, and build resilience for long-term wellbeing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.name} className="shadow-card">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                      <member.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-center mb-8">
                MindMatters was born from a simple observation: while technology has 
                transformed many aspects of healthcare, mental health support remained 
                fragmented and often inaccessible.
              </p>
              
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <p className="mb-4">
                    Our founder, Dr. Sarah Chen, noticed that her patients needed support 
                    between therapy sessions—a way to track their progress, connect with 
                    others, and access tools for managing their mental health day-to-day.
                  </p>
                  <p className="mb-4">
                    This insight led to the creation of MindMatters: a comprehensive platform 
                    that bridges the gap between professional care and daily self-care. We've 
                    carefully designed every feature to be both clinically sound and deeply 
                    human.
                  </p>
                  <p>
                    Today, we're proud to serve thousands of users on their mental health 
                    journeys, providing them with the tools, community, and support they 
                    need to thrive.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-beige">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions about our platform or want to share your feedback? 
            We'd love to hear from you.
          </p>
          <Card className="max-w-md mx-auto shadow-card">
            <CardContent className="pt-6">
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> hello@mindmatters.com</p>
                <p><strong>Support:</strong> support@mindmatters.com</p>
                <p><strong>Phone:</strong> 1-800-MINDFUL</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;